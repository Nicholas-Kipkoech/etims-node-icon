import Organization from "../databases/organizations";

class OrganizationController {
  constructor() {}
  async createOrganization(req, res) {
    try {
      const { organization_name, organization_type } = req.body;

      const new_org = new Organization({
        organization_name,
        organization_type,
        created_at: Date.now(),
      });
      await new_org.save();
      return res.status(200).json({ organization: new_org });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }

  async fetchOrganizations(req, res) {
    try {
      const registered_organizations = await Organization.find({});
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
