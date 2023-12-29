import Organization from "../databases/organizations";
import users from "../databases/users";
import { generateRandom8DigitNumber } from "../utils/helpers";
import passHash from "../utils/passHash";

class OrganizationController {
  constructor() {}
  async createOrganization(req, res) {
    try {
      const {
        organization_name,
        organization_email,
        organization_phone,
        business_class,
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
        business_class,
      });

      await users.User.create({
        name: organization_name,
        email: organization_email,
        role: "Organization_user",
        password: genPassword,
        userId: new_org?._id,
        business_class: new_org?.business_class,
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
