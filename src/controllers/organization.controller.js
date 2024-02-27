import OrganizationDTO from "../databases/organizations.js";
import users from "../databases/users.js";

import {
  generateOrganizationAPIKey,
  generateRandom8DigitNumber,
} from "../utils/helpers.js";
import passHash from "../utils/passHash.js";
import { sendEmail } from "../utils/sendEmail.js";
import EtimsItemsDb from "../databases/ETIMS-items.js";

class OrganizationController {
  constructor() {}
  async createOrganization(req, res) {
    try {
      const { organization_email, organization_name, organization_phone } =
        req.body;
      const { error } = validateOrg(req.body);
      if (error) {
        return res.status(400).json({ error: error.message });
      }

      const checkOrganization = await OrganizationDTO.Organization.findOne({
        organization_email: organization_email,
      });
      if (checkOrganization) {
        return res.status(400).json({ error: "Organization already exists!!" });
      }
      const random8digit = generateRandom8DigitNumber().toString();
      const genPassword = await passHash.encrypt(random8digit);
      const new_org = new OrganizationDTO.Organization({
        organization_email,
        organization_name,
        organization_phone,
      });

      const generatedKey = generateOrganizationAPIKey();
      const newKey = new OrganizationDTO.APICredentials({
        organization: new_org._id,
        clientKey: generatedKey,
        created_at: Date.now(),
      });
      await newKey.save();
      sendEmail(
        organization_email,
        "Account Creation",
        random8digit,
        organization_name,
        generatedKey
      );

      await new_org.save();
      return res.status(200).json({ organization: new_org });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }

  async fetchOrganizations(req, res) {
    try {
      const registered_organizations = await OrganizationDTO.Organization.find(
        {}
      );
      if (registered_organizations) {
        return res.status(200).json({ registered_organizations });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }
}

const organizationController = new OrganizationController();
export default organizationController;
