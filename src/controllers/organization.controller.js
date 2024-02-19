import OrganizationDTO from "../databases/organizations.js";
import users from "../databases/users.js";
import {
  validateClass,
  validateComodity,
  validateFamily,
  validateOrg,
  validateSegment,
} from "../middlewares/validation.js";
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
      const {
        organization_email,
        organization_name,
        organization_phone,
        business_segment,
        business_family,
        business_class,
      } = req.body;
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
        business_segment,
        business_family,
        business_class,
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

      await users.User.create({
        name: organization_name,
        email: organization_email,
        role: "Admin",
        password: genPassword,
        userId: new_org?._id,
        organization_id: new_org?._id,
        business_class: new_org?.business_class,
        business_segment: new_org?.business_segment,
        business_family: new_org?.business_family,
        created_at: new_org?.created_at,
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

  async addSegment(req, res) {
    try {
      const { segment_code, segment_name } = req.body;
      const { error } = validateSegment(req.body);
      if (error) {
        return res.status(400).json({ error: error.message });
      }
      const segment = await EtimsItemsDb.Segment.findOne({
        segment_code: segment_code,
      });
      if (segment) {
        return res
          .status(400)
          .json({ message: `Segment with code ${segment_code} exists!` });
      }
      const newSegment = new EtimsItemsDb.Segment({
        segment_name: segment_name,
        segment_code: segment_code,
      });
      await newSegment.save();
      return res.status(200).json({ message: `Segment added successfully!` });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }

  async fetchSegment(req, res) {
    try {
      const { code } = req.params;
      const segment = await EtimsItemsDb.Segment.findOne({
        segment_code: code,
      });
      return res.status(200).json({ segment });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }

  async fetchSegments(req, res) {
    try {
      const segments = await EtimsItemsDb.Segment.find({});
      return res.status(200).json({ segments });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }
  async addFamily(req, res) {
    try {
      const { segmentId, family_code, family_name } = req.body;
      const { error } = validateFamily(req.body);
      if (error) {
        return res.status(400).json({ error: error.message });
      }
      const family = await EtimsItemsDb.Family.findOne({
        family_code: family_code,
      });
      if (family) {
        return res.status(400).json({
          error: `Item family with code ${family_code} already exists! `,
        });
      }
      const _segment = await EtimsItemsDb.Segment.findById(segmentId);
      if (!_segment) {
        return res
          .status(404)
          .json({ error: "No segment with that ID found!!" });
      }
      const newFamily = new EtimsItemsDb.Family({
        segment: _segment,
        family_code: family_code,
        family_name: family_name,
      });
      await newFamily.save();
      return res.status(200).json({ message: `Family added successfully!` });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }
  async fetchFamily(req, res) {
    try {
      const { code } = req.params;
      const family = await EtimsItemsDb.Family.findOne({ family_code: code });
      return res.status(200).json({ family });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }
  async fetchFamilies(req, res) {
    try {
      const { segment_code } = req.params;
      const segment = await EtimsItemsDb.Segment.findOne({
        segment_code: segment_code,
      });
      const families = await EtimsItemsDb.Family.find({
        segment: segment?._id,
      }); // You can add more conditions if needed
      if (families) {
        return res.status(200).json({ families });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error?.message });
    }
  }
  async addClass(req, res) {
    try {
      const { familyId, class_name, class_code } = req.body;
      const { error } = validateClass(req.body);
      if (error) {
        return res.status(400).json({ error: error.message });
      }
      const _class = await EtimsItemsDb.Class.findOne({
        class_code: class_code,
      });
      if (_class) {
        return res.status(400).json({
          error: `Item Class with code ${class_code} already exists! `,
        });
      }
      const _family = await EtimsItemsDb.Family.findById(familyId);
      if (!_family) {
        return res
          .status(404)
          .json({ error: "No Family with that ID found!!" });
      }
      const newClass = new EtimsItemsDb.Class({
        family: _family,
        class_name: class_name,
        class_code: class_code,
      });
      await newClass.save();
      return res.status(200).json({ message: "Class added successfully!" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error?.message });
    }
  }
  async fetchClass(req, res) {
    try {
      const { code } = req.params;
      const _class = await EtimsItemsDb.Class.findOne({ class_code: code });
      return res.status(200).json({ _class });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }
  async fetchClasses(req, res) {
    try {
      const { family_code } = req.params;
      const family = await EtimsItemsDb.Family.findOne({
        family_code: family_code,
      });
      const classes = await EtimsItemsDb.Class.find({ family: family?._id });
      if (classes) {
        return res.status(200).json({ classes });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error?.message });
    }
  }
  async addComodity(req, res) {
    try {
      const { classId, comodity_name, comodity_code } = req.body;
      const { error } = validateComodity(req.body);
      if (error) {
        return res.status(400).json({ error: error.message });
      }
      const _comodity = await EtimsItemsDb.Comodity.findOne({
        comodity_code: comodity_code,
      });
      if (_comodity) {
        return res.status(400).json({
          error: `Item Comodity with code ${comodity_code} already exists! `,
        });
      }
      const _class = await EtimsItemsDb.Class.findById(classId);
      if (!_class) {
        return res.status(404).json({ error: "No Class with that ID found!!" });
      }
      const newComodity = new EtimsItemsDb.Comodity({
        class: _class,
        comodity_name: comodity_name,
        comodity_code: comodity_code,
      });
      await newComodity.save();
      return res.status(200).json({ message: "Comodity added successfully!" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error?.message });
    }
  }
  async fetchComidities(req, res) {
    try {
      const { class_code } = req.params;
      const _class = await EtimsItemsDb.Class.findOne({
        class_code: class_code,
      });
      const comodities = await EtimsItemsDb.Comodity.find({
        class: _class?._id,
      });
      if (comodities) {
        return res.status(200).json({ comodities });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error?.message });
    }
  }
}

const organizationController = new OrganizationController();
export default organizationController;
