// //  "use client";

// // import { useState } from "react";
// // import { FormProvider, useForm } from "react-hook-form";

// // import DynamicField from "@/components/ui/fields/dynamicField";
// // import { Button } from "@/components/ui/button";

// // import Loader from "@/components/ui/loader";
// // import { Toaster } from "@/components/ui/toaster";
// // import { useRouter } from "next/navigation";
// // import { apiRequest } from "@/lib/api";

// // type SignupForm = {
// //   company_name: string;
// //   email: string;
// //   phone: string;
// //   password: string;
// //   reenter_password: string;
// // };

// // type FieldWrapperProps = {
// //   label: string;
// //   children: React.ReactNode;
// // };

// // function FieldWrapper({
// //   label,
// //   children,
// // }: FieldWrapperProps) {
// //   return (
// //     <div className="space-y-2">
// //       <label className="form-label">{label}</label>
// //       {children}
// //     </div>
// //   );
// // }

// // export default function SignupPage() {
// //   const [loading, setLoading] = useState(false);
// // const router = useRouter();
// //   const [toast, setToast] = useState<{
// //     message: string;
// //     type: "success" | "error";
// //   } | null>(null);

// //   const methods = useForm<SignupForm>({
// //     defaultValues: {
// //       company_name: "",
// //       email: "",
// //       phone: "",
// //       password: "",
       
// //     },
// //   });

// //   const onSubmit = async (data: SignupForm) => {
// //     try {
// //       setLoading(true);

// //       const response = await apiRequest({
// //         endpoint: "SIGNUP",
// //         data,
// //       });

// //       setToast({
// //         message: response.message || "Success",
// //         type: "success",
// //       });

// //     } catch (error: any) {

// //       setToast({
// //         message: error.message || "Failed",
// //         type: "error",
// //       });

// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <>
// //       {loading && <Loader />}

// //       {toast && (
// //         <Toaster
// //           message={toast.message}
// //           type={toast.type}
// //           onClose={() => setToast(null)}
// //         />
// //       )}

// //       <div className="min-h-screen flex items-center justify-center bg-gray-100">
// //         <div className="bg-white rounded-2xl shadow-xl p-8 w-[500px]">
// //           <h2 className="text-3xl font-bold text-[#103BB5] mb-6">
// //             Create Company
// //           </h2>

// //           <FormProvider {...methods}>
// //             <form
// //               onSubmit={methods.handleSubmit(onSubmit)}
// //               className="space-y-5"
// //             >
// //               <FieldWrapper label="Company Name">
// //                 <DynamicField
// //                   name="company_name"
// //                   type="input"
// //                   placeholder="Company Name"
// //                   required
// //                   capitalize
// //                 />
// //               </FieldWrapper>

// //               <FieldWrapper label="Company Email">
// //                 <DynamicField
// //                   name="email"
// //                   type="input"
// //                   placeholder="Company Email"
// //                   required
// //                   validationType="email"
// //                 />
// //               </FieldWrapper>

// //               <FieldWrapper label="Phone Number">
// //                 <DynamicField
// //                   name="phone"
// //                   type="input"
// //                   placeholder="Phone Number"
// //                   required
// //                   validationType="phone"
// //                   maxLength={10}
// //                 />
// //               </FieldWrapper>

// //               <FieldWrapper label="Password">
// //                 <DynamicField
// //                   name="password"
// //                   type="input"
// //                   placeholder="Password"
// //                   required
// //                   validationType="password"
// //                 />
// //               </FieldWrapper>

// //               <FieldWrapper label="Re-enter Password">
// //                 <DynamicField
// //                   name="reenter_password"
// //                   type="input"
// //                   placeholder="Re-enter Password"
// //                   required
// //                   validationType="password"
// //                 />
// //               </FieldWrapper>

// //               <Button
// //   type="submit"
// //   className="w-full bg-[#103BB5]"
// // >
// //   Create Company
// // </Button>

// // <div className="text-center text-sm text-gray-600">
// //   If you're already a client?{" "}
  
// //   <button
// //     type="button"
// //     onClick={() => router.push("/login")}
// //     className="text-[#103BB5] font-medium hover:underline"
// //   >
// //     Click Login
// //   </button>
// // </div>
// //             </form>
// //           </FormProvider>
// //         </div>
// //       </div>
// //     </>
// //   );
// // }


// "use client";

// import { useState } from "react";
// import { FormProvider, useForm } from "react-hook-form";
// import { useRouter } from "next/navigation";

// import DynamicField from "@/components/ui/fields/dynamicField";
// import { Button } from "@/components/ui/button";

// import Loader from "@/components/ui/loader";
// import { Toaster } from "@/components/ui/toaster";

// type SignupForm = {
//   company_name: string;
//   email: string;
//   phone: string;
//   password: string;
//   reenter_password: string;
// };

// type FieldWrapperProps = {
//   label: string;
//   children: React.ReactNode;
// };

// function FieldWrapper({
//   label,
//   children,
// }: FieldWrapperProps) {
//   return (
//     <div className="space-y-2">
//       <label className="form-label">{label}</label>
//       {children}
//     </div>
//   );
// }

// export default function SignupPage() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [toast, setToast] = useState<{
//     message: string;
//     type: "success" | "error";
//   } | null>(null);

//   const methods = useForm<SignupForm>({
//     defaultValues: {
//       company_name: "",
//       email: "",
//       phone: "",
//       password: "",
//       reenter_password: "",
//     },
//   });

//   const onSubmit = async (data: SignupForm) => {
//     try {
//       setLoading(true);

//       // Simulate API delay
//       await new Promise(resolve => setTimeout(resolve, 1000));

//       setToast({
//         message: "Company registered successfully!",
//         type: "success",
//       });

//       // Reset form
//       methods.reset();

//       // Redirect to login after success
//       setTimeout(() => {
//         router.push("/login");
//       }, 1500);

//     } catch (error: any) {
//       setToast({
//         message: "Registration failed. Please try again.",
//         type: "error",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       {loading && <Loader />}

//       {toast && (
//         <Toaster
//           message={toast.message}
//           type={toast.type}
//           onClose={() => setToast(null)}
//         />
//       )}

//       <div className="min-h-screen flex items-center justify-center bg-gray-100">
//         <div className="bg-white rounded-2xl shadow-xl p-8 w-[500px]">
//           <h2 className="text-3xl font-bold text-[#103BB5] mb-6">
//             Create Company
//           </h2>

//           <FormProvider {...methods}>
//             <form
//               onSubmit={methods.handleSubmit(onSubmit)}
//               className="space-y-5"
//             >
//               <FieldWrapper label="Company Name">
//                 <DynamicField
//                   name="company_name"
//                   type="input"
//                   placeholder="Company Name"
//                   required
//                   capitalize
//                 />
//               </FieldWrapper>

//               <FieldWrapper label="Company Email">
//                 <DynamicField
//                   name="email"
//                   type="input"
//                   placeholder="Company Email"
//                   required
//                   validationType="email"
//                 />
//               </FieldWrapper>

//               <FieldWrapper label="Phone Number">
//                 <DynamicField
//                   name="phone"
//                   type="input"
//                   placeholder="Phone Number"
//                   required
//                   validationType="phone"
//                   maxLength={10}
//                 />
//               </FieldWrapper>

//               <FieldWrapper label="Password">
//                 <DynamicField
//                   name="password"
//                   type="input"
//                   placeholder="Password"
//                   required
//                   validationType="password"
//                 />
//               </FieldWrapper>

//               <FieldWrapper label="Re-enter Password">
//                 <DynamicField
//                   name="reenter_password"
//                   type="input"
//                   placeholder="Re-enter Password"
//                   required
//                   validationType="password"
//                 />
//               </FieldWrapper>

//               <Button
//                 type="submit"
//                 className="w-full bg-[#103BB5]"
//               >
//                 Create Company
//               </Button>

//               <div className="text-center text-sm text-gray-600">
//                 If you're already a client?{" "}
//                 <button
//                   type="button"
//                   onClick={() => router.push("/login")}
//                   className="text-[#103BB5] font-medium hover:underline"
//                 >
//                   Click Login
//                 </button>
//               </div>
//             </form>
//           </FormProvider>
//         </div>
//       </div>
//     </>
//   );
// }
"use client";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import DynamicField from "@/components/ui/fields/dynamicField";
import { Button } from "@/components/ui/button";

import Loader from "@/components/ui/loader";
import { Toaster } from "@/components/ui/toaster";
import { useRouter } from "next/navigation";
import { postAPI } from "@/app/utils/api";

type SignupForm = {
  company_name: string;
  email: string;
  phone: string;
  password: string;
  reenter_password: string;
};

type FieldWrapperProps = {
  label: string;
  children: React.ReactNode;
};

function FieldWrapper({ label, children }: FieldWrapperProps) {
  return (
    <div className="space-y-2">
      <label className="form-label">{label}</label>
      {children}
    </div>
  );
}

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const methods = useForm<SignupForm>({
    defaultValues: {
      company_name: "",
      email: "",
      phone: "",
      password: "",
      reenter_password: "",
    },
  });

  const onSubmit = async (data: SignupForm) => {
    if (data.password !== data.reenter_password) {
      setToast({ message: "Passwords do not match", type: "error" });
      return;
    }

    try {
      setLoading(true);

      const response = await postAPI(
        "REGISTER",
        {
          company_name: data.company_name,
          email: data.email,
          phone: data.phone,
          password: data.password,
        },
        false
      );

      if (response.success === true) {
        setToast({
          message: response.message || "Company created successfully",
          type: "success",
        });
        methods.reset();
        setTimeout(() => router.push("/login"), 1500);
      } else {
        setToast({
          message: response.message || "Signup failed",
          type: "error",
        });
      }
    } catch (error: any) {
      setToast({
        message: error.message || "Something went wrong",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}

      {toast && (
        <Toaster
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-[500px]">
          <h2 className="text-3xl font-bold text-[#103BB5] mb-6">
            Create Company
          </h2>

          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="space-y-5"
            >
              <FieldWrapper label="Company Name">
                <DynamicField
                  name="company_name"
                  type="input"
                  placeholder="Company Name"
                  required
                  capitalize
                />
              </FieldWrapper>

              <FieldWrapper label="Company Email">
                <DynamicField
                  name="email"
                  type="input"
                  placeholder="Company Email"
                  required
                  validationType="email"
                />
              </FieldWrapper>

              <FieldWrapper label="Phone Number">
                <DynamicField
                  name="phone"
                  type="input"
                  placeholder="Phone Number"
                  required
                  validationType="phone"
                  maxLength={10}
                />
              </FieldWrapper>

              <FieldWrapper label="Password">
                <DynamicField
                  name="password"
                  type="input"
                  placeholder="Password"
                  required
                  validationType="password"
                />
              </FieldWrapper>

              <FieldWrapper label="Re-enter Password">
                <DynamicField
                  name="reenter_password"
                  type="input"
                  placeholder="Re-enter Password"
                  required
                  validationType="password"
                />
              </FieldWrapper>

              <Button type="submit" className="w-full bg-[#103BB5]">
                Create Company
              </Button>

              <div className="text-center text-sm text-gray-600">
                Already a client?{" "}
                <button
                  type="button"
                  onClick={() => router.push("/login")}
                  className="text-[#103BB5] font-medium hover:underline"
                >
                  Click Login
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </>
  );
}