import Organization from "../databases/organizations.js";
import users from "../databases/users.js";
import { generateRandom8DigitNumber } from "../utils/helpers.js";
import passHash from "../utils/passHash.js";
import { sendEmail } from "../utils/sendEmail.js";

class OrganizationController {
  constructor() {}
  async createOrganization(req, res) {
    try {
      const {
        organization_name,
        organization_email,
        organization_phone,
        business_class,
        business_segment,
        business_family,
        business_comodity,
      } = req.body;
      const checkOrganization = await Organization.findOne({
        organization_email: email,
      });
      if (checkOrganization) {
        return res.status(400).json({ error: "Organization already exists!!" });
      }
      const random8digit = generateRandom8DigitNumber().toString();
      const genPassword = await passHash.encrypt(random8digit);
      const new_org = new Organization({
        organization_email,
        organization_name,
        organization_phone,
        business_segment,
        business_family,
        business_class,
        business_comodity,
      });

      sendEmail(
        organization_email,
        "Account Creation",
        genPassword,
        organization_name
      );

      await users.User.create({
        name: organization_name,
        email: organization_email,
        role: "Organization_user",
        password: genPassword,
        userId: new_org?._id,
        business_class: new_org?.business_class,
        business_segment: new_org?.business_segment,
        business_comodity: new_org?.business_comodity,
        business_family: new_org?.business_family,
      });
      await new_org.save();
      return res.status(200).json({ organization: new_org });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }
}

const organizationController = new OrganizationController();
export default organizationController;
