// //  "use client";

// // import { useState } from "react";
// // import { useRouter } from "next/navigation";
// // import { FormProvider, useForm } from "react-hook-form";

// // import DynamicField from "@/components/ui/fields/dynamicField";
// // import { Button } from "@/components/ui/button";

// // import Loader from "@/components/ui/loader";
// // import { Toaster } from "@/components/ui/toaster";

// // import { apiRequest } from "@/lib/api";

// // type LoginForm = {
// //   username: string;
// //   password: string;
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

// // export default function LoginPage() {
// //   const router = useRouter();

// //   const [loading, setLoading] = useState(false);

// //   const [toast, setToast] = useState<{
// //     message: string;
// //     type: "success" | "error";
// //   } | null>(null);

// //   const methods = useForm<LoginForm>({
// //     defaultValues: {
// //       username: "",
// //       password: "",
// //     },
// //   });

// //   const onSubmit = async (data: LoginForm) => {
// //     try {
// //       setLoading(true);

// //       const response = await apiRequest({
// //         endpoint: "LOGIN",
// //         data,
// //       });

// //       setToast({
// //         message: response.message || "Login Success",
// //         type: "success",
// //       });

// //       // Save token if available
// //       if (response.data.token) {
// //         localStorage.setItem("token", response.token);
// //       }

// //       // Redirect after login
// //       setTimeout(() => {
// //         router.push("/dashboard");
// //       }, 1000);

// //     } catch (error: any) {

// //       setToast({
// //         message: error.message || "Login Failed",
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

// //       <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        
// //         <div className="bg-white rounded-2xl shadow-xl p-8 w-full min-w-[400]  max-w-[400]">

// //           <h2 className="text-3xl font-bold text-[#103BB5] mb-6">
// //             Login
// //           </h2>

// //           <FormProvider {...methods}>
// //             <form
// //               onSubmit={methods.handleSubmit(onSubmit)}
// //               className="space-y-5"
// //             >

// //               <FieldWrapper label="Username">
// //                 <DynamicField
// //                   name="username"
// //                   type="input"
// //                   placeholder="Enter Username"
// //                   required
// //                 />
// //               </FieldWrapper>

// //               <FieldWrapper label="Password">
// //                 <DynamicField
// //                   name="password"
// //                   type="input"
// //                   placeholder="Enter Password"
// //                   required
// //                   validationType="password"
// //                 />
// //               </FieldWrapper>

// //               <Button
// //                 type="submit"
// //                 className="w-full bg-[#103BB5]"
// //               >
// //                 Login
// //               </Button>

// //               <div className="text-center text-sm text-gray-600">
// //                 Don't have an account?{" "}

// //                 <button
// //                   type="button"
// //                   onClick={() => router.push("/signup")}
// //                   className="text-[#103BB5] font-medium hover:underline"
// //                 >
// //                   Create Account
// //                 </button>
// //               </div>

// //             </form>
// //           </FormProvider>

// //         </div>

// //       </div>
// //     </>
// //   );
// // }


// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { FormProvider, useForm } from "react-hook-form";

// import DynamicField from "@/components/ui/fields/dynamicField";
// import { Button } from "@/components/ui/button";

// import Loader from "@/components/ui/loader";
// import { Toaster } from "@/components/ui/toaster";

// type LoginForm = {
//   username: string;
//   password: string;
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

// export default function LoginPage() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [toast, setToast] = useState<{
//     message: string;
//     type: "success" | "error";
//   } | null>(null);

//   const methods = useForm<LoginForm>({
//     defaultValues: {
//       username: "",
//       password: "",
//     },
//   });

// const onSubmit = async (data: LoginForm) => {
//   try {
//     setLoading(true);

//     await new Promise(resolve => setTimeout(resolve, 800));

//     // Save fake token
//     localStorage.setItem("token", "demo-token-12345");

//     setToast({
//       message: "Login successful!",
//       type: "success",
//     });

//     setTimeout(() => {
//       router.push("/dashboard");
//     }, 1600);

//   } catch (error) {
//     setToast({
//       message: "Login failed. Please try again.",
//       type: "error",
//     });
//   } finally {
//     setLoading(false);
//   }
// };

//   // Debug: Check if router is working
//   useEffect(() => {
//     console.log("Router is ready:", router);
//   }, [router]);

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

//       <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//         <div className="bg-white rounded-2xl shadow-xl p-8 w-full min-w-[400px] max-w-[400px]">
//           <h2 className="text-3xl font-bold text-[#103BB5] mb-6">
//             Login
//           </h2>

//           <FormProvider {...methods}>
//             <form
//               onSubmit={methods.handleSubmit(onSubmit)}
//               className="space-y-5"
//             >
//               <FieldWrapper label="Username">
//                 <DynamicField
//                   name="username"
//                   type="input"
//                   placeholder="Enter Username"
//                   required
//                 />
//               </FieldWrapper>

//               <FieldWrapper label="Password">
//                 <DynamicField
//                   name="password"
//                   type="input"
//                   placeholder="Enter Password"
//                   required
//                   validationType="password"
//                 />
//               </FieldWrapper>

//               <Button
//                 type="submit"
//                 className="w-full bg-[#103BB5]"
//               >
//                 Login
//               </Button>

//               <div className="text-center text-sm text-gray-600">
//                 Don't have an account?{" "}
//                 <button
//                   type="button"
//                   onClick={() => router.push("/signup")}
//                   className="text-[#103BB5] font-medium hover:underline"
//                 >
//                   Create Account
//                 </button>
//               </div>
//             </form>
//           </FormProvider>
//         </div>
//       </div>
//     </>
//   );
// }








// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { FormProvider, useForm, SubmitHandler } from "react-hook-form";

// import DynamicField from "@/components/ui/fields/dynamicField";
// import { Button } from "@/components/ui/button";
// import Loader from "@/components/ui/loader";
// import { Toaster } from "@/components/ui/toaster";
// import { postAPI } from "@/app/utils/api";

// type LoginForm = {
//   username: string;
//   password: string;
// };

// type FieldWrapperProps = {
//   label: string;
//   children: React.ReactNode;
// };

// function FieldWrapper({ label, children }: FieldWrapperProps) {
//   return (
//     <div className="space-y-2">
//       <label className="form-label">{label}</label>
//       {children}
//     </div>
//   );
// }

// export default function LoginPage() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);

//   const [toast, setToast] = useState<{
//     message: string;
//     type: "success" | "error";
//   } | null>(null);

//   const methods = useForm<LoginForm>({
//     defaultValues: {
//       username: "",
//       password: "",
//     },
//   });

//   const onSubmit: SubmitHandler<LoginForm> = async (data) => {
//     setLoading(true);

//     try {
//       const payload = {
//         username: data.username,
//         password: data.password,
//       };

//       const response = await postAPI("LOGIN", payload, false); // false = no auth needed for login

//       setToast({
//         message: response.message || "Login successful",
//         type: "success",
//       });

//       // Save token & user data
//      if (response.data?.token) {
//   localStorage.setItem("token", response.data.token);
// }

// if (response.data) {
//   localStorage.setItem("user", JSON.stringify(response.data));
// }

//       // Redirect after short delay
//       setTimeout(() => {
//         router.push("/dashboard");
//       }, 1200);

//     } catch (error: any) {
//       console.error(error);
//       setToast({
//         message: error.message || "Invalid credentials. Please try again.",
//         type: "error",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleToastClose = () => setToast(null);

//   return (
//     <>
//       {loading && <Loader />}

//       {toast && (
//         <Toaster
//           message={toast.message}
//           type={toast.type}
//           onClose={handleToastClose}
//         />
//       )}

//       <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//         <div className="bg-white rounded-2xl shadow-xl p-8 w-full min-w-[400px] max-w-[400px]">
//           <h2 className="text-3xl font-bold text-[#103BB5] mb-6 text-center">
//             Login
//           </h2>

//           <FormProvider {...methods}>
//             <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-5">
//               <FieldWrapper label="Username">
//                 <DynamicField
//                   name="username"
//                   type="input"
//                   placeholder="Enter Username"
//                   validation={{ required: "Username is required" }}
//                 />
//               </FieldWrapper>

//               <FieldWrapper label="Password">
//                 <DynamicField
//                   name="password"
//                   type="input"
//                   placeholder="Enter Password"
//                   validationType="password"
//                   validation={{ required: "Password is required" }}
//                 />
//               </FieldWrapper>

//               <Button type="submit" className="w-full bg-[#103BB5]" disabled={loading}>
//                 {loading ? "Logging in..." : "Login"}
//               </Button>

//               <div className="text-center text-sm text-gray-600">
//                 Don't have an account?{" "}
//                 <button
//                   type="button"
//                   onClick={() => router.push("/signup")}
//                   className="text-[#103BB5] font-medium hover:underline"
//                 >
//                   Create Account
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
import { useRouter } from "next/navigation";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";

import DynamicField from "@/components/ui/fields/dynamicField";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { Toaster } from "@/components/ui/toaster";
import { postAPI, setSession } from "@/app/utils/api";

type LoginForm = {
  username: string;
  password: string;
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

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const methods = useForm<LoginForm>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    setLoading(true);

    try {
      const payload = {
        username: data.username,
        password: data.password,
      };

      const response = await postAPI("LOGIN", payload, false);

      setToast({
        message: response.message || "Login successful",
        type: "success",
      });

      // === UPDATED SESSION HANDLING ===
      if (response.data?.token && response.data?.company_id) {
        const { token, company_id, user_type, username } = response.data;

        setSession(token, company_id, {
          user_type,
          username,
        });

        console.log("✅ Session saved with Company ID:", company_id);
      } else {
        console.warn("⚠️ Missing token or company_id in response");
        // Fallback: store what we have
        if (response.data?.token) {
          localStorage.setItem("token", response.data.token);
        }
        if (response.data) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
      }

      // Redirect after success
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);

    } catch (error: any) {
      console.error(error);
      setToast({
        message: error.message || "Invalid credentials. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleToastClose = () => setToast(null);

  return (
    <>
      {loading && <Loader />}

      {toast && (
        <Toaster
          message={toast.message}
          type={toast.type}
          onClose={handleToastClose}
        />
      )}

      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full min-w-[400px] max-w-[400px]">
          <h2 className="text-3xl font-bold text-[#103BB5] mb-6 text-center">
            Login
          </h2>

          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-5">
              <FieldWrapper label="Username">
                <DynamicField
                  name="username"
                  type="input"
                  placeholder="Enter Username"
                  validation={{ required: "Username is required" }}
                />
              </FieldWrapper>

              <FieldWrapper label="Password">
                <DynamicField
                  name="password"
                  type="input"
                  placeholder="Enter Password"
                  validationType="password"
                  validation={{ required: "Password is required" }}
                />
              </FieldWrapper>

              <Button type="submit" className="w-full bg-[#103BB5]" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>

              <div className="text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => router.push("/signup")}
                  className="text-[#103BB5] font-medium hover:underline"
                >
                  Create Account
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </>
  );
}