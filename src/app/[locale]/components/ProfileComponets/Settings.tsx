"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Camera, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { CldUploadWidget } from "next-cloudinary";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  bio: z.string().max(160, "Bio must be less than 160 characters"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function Settings() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const { user, getUser } = useKindeBrowserClient();
  const currentUser = getUser();
  const [cuUser, setcuUser] = useState<any>([]);

  console.log(cuUser);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      email: "",
      bio: "",
    },
  });

  const { reset } = form;

  useEffect(() => {
    const fetchUser = async () => {
      if (!currentUser?.id) return;

      try {
        const response = await fetch(`/api/user?id=${currentUser.id}`);

        if (response.ok) {
          const data = await response.json();
          setcuUser(data);
          setPreviewImage(data.avatarUrl);

          // Update form values when cuUser data changes
          reset({
            name: data[0]?.name || "",
            email: data[0]?.email || "",
            bio: data[0]?.bio || "",
          });
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [currentUser?.id, reset]);

  async function onSubmit(data: ProfileFormValues) {
    setIsLoading(true);
    const dataToSend = { data, images: previewImage || cuUser.avatarUrl };
    try {
      const response = await fetch(`/api/user`, {
        method: "PATCH",
        body: JSON.stringify(dataToSend),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setIsLoading(false);
        toast({
          title: "Profile updated",
          description: "Your profile has been updated successfully.",
        });
      } else {
        setIsLoading(false);
        toast({
          title: "Error Happend",
          description: "Error Happend Pleace Contact Our Team",
        });
      }
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Error Happend",
        description: "Error Happend Pleace Contact Our Team",
      });
    }
  }

  return (
    <div className="container mx-auto flex flex-col space-y-[50px] px-5 lg:px-5 xl:px-20 md:px-10 2xl:px-44 mb-3 bg-white">
      <div className="space-y-6 mt-8">
        <div>
          <h1 className="text-3xl font-bold">Edit Profile</h1>
          <p className="text-muted-foreground">
            Update your photo and personal details here.
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="h-24 w-24 rounded-full overflow-hidden bg-secondary">
              {previewImage ? (
                <>
                  <img
                    src={previewImage}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                  sdf
                </>
              ) : (
                <div className="h-full w-full flex items-center justify-center">
                  <Camera className="h-12 w-12 text-muted-foreground" />
                </div>
              )}
            </div>
            <CldUploadWidget
              signatureEndpoint="/api/sign-cloudinary-params"
              onSuccess={async (results: any) => {
                const imageUrl = results?.info?.secure_url;
                setPreviewImage(imageUrl);
              }}
            >
              {({ open }) => (
                <Label
                  htmlFor="picture"
                  className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-1 rounded-full cursor-pointer hover:bg-primary/90 transition-colors"
                >
                  <button type="button" onClick={() => open()}>
                    <Camera className="h-4 w-4" />
                  </button>
                  {/* <input
                    type="hidden"
                    name="image"
                    value={previewImage as string}
                  /> */}
                </Label>
              )}
            </CldUploadWidget>
          </div>
          <div>
            <h3 className="font-medium">Profile photo</h3>
            <p className="text-sm text-muted-foreground">
              Click the camera icon to upload a new photo
            </p>
          </div>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                {...form.register("name")}
                placeholder="Enter your name"
              />
              {form.formState.errors.name && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...form.register("email")}
                placeholder="Enter your email"
              />
              {form.formState.errors.email && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              {...form.register("bio")}
              placeholder="Tell us about yourself"
              className="resize-none"
            />
            {form.formState.errors.bio && (
              <p className="text-sm text-destructive">
                {form.formState.errors.bio.message}
              </p>
            )}
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
