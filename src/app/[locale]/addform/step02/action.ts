import { stepTowSchema } from "@/lib/schemas";
import { AddDealRoutes, FromErrors } from "@/lib/types";
import { redirect } from "next/navigation";

export const stepTowFormAction: any = (
  prevState: FromErrors | undefined,
  formData: FormData
): FromErrors | undefined => {
  const data = Object.fromEntries(formData.entries());
  const validate = stepTowSchema.safeParse(data);

  if (!validate.success) {
    const errors: any = validate.error.issues.reduce((acc: any, issue) => {
      acc[issue.path[0]] = issue.message;
      return acc;
    });

    return { errors };
  } else {
    redirect(AddDealRoutes.PostAds);
  }
};