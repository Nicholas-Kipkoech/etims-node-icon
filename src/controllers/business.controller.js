import Business from "../databases/business.js";
import Organization from "../databases/organizations.js";
class BusinessController {
  constructor() {}

  async createBusiness(req, res) {
    try {
      const { organizationId, pin, businessName, businessType } = req.body;
      const organization = await Organization.findById(organizationId);

      if (organization) {
        const new_business = new Business({
          organization: organization,
          businessName,
          businessType,
          created_at: Date.now(),
        });
        await new_business.save();
        return res.status(200).json({ new_business });
      } else {
        return res.status(404).json({ error: "Organization not found!" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }
  async fetchBusiness(req, res) {
    try {
      const { organizationId } = req.params;
      const businesses = await Business.find({ organization: organizationId });
      return res.status(200).json({ businesses });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }
}

const businessController = new BusinessController();
export default businessController;
