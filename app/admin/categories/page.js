import { prisma } from "@/lib/prisma";
import { CategoryForm } from "@/components/admin/CategoryForm";
import { VariantForm } from "@/components/admin/VariantForm";
import { DeleteVariantForm } from "@/components/admin/DeleteVariantForm";
import { AddVariantForm } from "@/components/admin/AddVariantForm";

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { createdAt: "asc" },
    include: { variants: { orderBy: { createdAt: "asc" } } },
  });

  return (
    <div>
      <h1 className="text-2xl font-display font-extrabold mb-1">Categories</h1>
      <p className="text-black/60 mb-8">
        Flip a category live once it&apos;s actually ready to sell, and manage its variants (sizes/quantities and their
        prices) below.
      </p>

      <div className="space-y-6 max-w-2xl">
        {categories.map((category) => (
          <div key={category.id} className="bg-white border border-grey-line rounded-xl p-5">
            <CategoryForm category={category} />

            <div className="mt-5 pt-5 border-t border-grey-line">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-black/50 mb-3">Variants</h3>

              {category.variants.length === 0 && (
                <p className="text-sm text-black/50 mb-4">No variants yet — uses the fallback price/stock above.</p>
              )}

              <div className="space-y-3 mb-4">
                {category.variants.map((variant) => (
                  <VariantForm key={variant.id} variant={variant} />
                ))}
              </div>

              {category.variants.map((variant) => (
                <DeleteVariantForm key={`del-${variant.id}`} variant={variant} />
              ))}

              <AddVariantForm categoryId={category.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
