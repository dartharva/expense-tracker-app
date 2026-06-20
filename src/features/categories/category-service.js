import {
  findCategoryByNormalizedName,
  listCategories as repoListCategories,
  saveCategory,
} from "../../services/storage/category-repository.js";
import { validateCategoryName } from "../../utils/validation.js";
import { isoNow } from "../../utils/time.js";

const DEFAULT_CATEGORY_NAME = "General";

export function createCategoryService() {
  return {
    async ensureDefaultCategory() {
      const { normalizedName } = validateCategoryName(DEFAULT_CATEGORY_NAME);
      const existing = await findCategoryByNormalizedName(normalizedName);
      if (!existing) {
        await saveCategory({
          id: crypto.randomUUID(),
          name: DEFAULT_CATEGORY_NAME,
          normalizedName,
          createdAt: isoNow(),
          updatedAt: isoNow(),
          isArchived: false,
        });
      }
    },

    async createCategory(name) {
      const parsed = validateCategoryName(name);
      const existing = await findCategoryByNormalizedName(parsed.normalizedName);
      if (existing && !existing.isArchived) {
        throw new Error("Category already exists");
      }
      const category = {
        id: crypto.randomUUID(),
        ...parsed,
        createdAt: isoNow(),
        updatedAt: isoNow(),
        isArchived: false,
      };
      await saveCategory(category);
      return category;
    },

    async renameCategory(id, newName) {
      const categories = await repoListCategories();
      const target = categories.find((item) => item.id === id);
      if (!target) {
        throw new Error("Category not found");
      }
      const parsed = validateCategoryName(newName);
      // This normalization check prevents case/whitespace duplicates from splitting analytics.
      const duplicate = categories.find(
        (item) => item.id !== id && !item.isArchived && item.normalizedName === parsed.normalizedName,
      );
      if (duplicate) {
        throw new Error("Another category already uses that name");
      }

      await saveCategory({
        ...target,
        name: parsed.name,
        normalizedName: parsed.normalizedName,
        updatedAt: isoNow(),
      });
    },

    async listCategories() {
      return repoListCategories();
    },
  };
}