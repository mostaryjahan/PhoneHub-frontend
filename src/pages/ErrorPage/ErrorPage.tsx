// import { Link, useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import { useRouteError } from "react-router-dom";
// // import errorImage from "../../assets/error-image.png";
// import { Heart } from "lucide-react";
// import { Button } from "@/components/ui/button";

// const ErrorPage = () => {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const error: any = useRouteError();
//   const navigate = useNavigate();

//   // ensure that the new page starts at the top when navigating
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);
//   return (
//     <>
    
//       <section className="relative bg-yellow-400/5">
//         <div className="">
//           <div className="grid grid-cols-1">
//             <div className="flex flex-col min-h-screen justify-center md:px-10 py-10 px-4">
//               <div className="text-center">
//                 <Link to={"/"}>
//                   {/* <img src={errorImage} className="mx-auto w-20" alt="" /> */}
//                 </Link>
//               </div>
//               <div className=" text-center my-auto ">
//                 <div className="mx-auto "></div>
//                 <img
//                   src="https://i.ibb.co/SxMVZWM/error.png"
//                   className="mx-auto"
//                   alt=""
//                 />
//                 <h1 className="mt-3 mb-6 md:text-4xl text-3xl font-bold ">
//                   {error?.data}
//                 </h1>
//                 <p className="my-10 text-red-500 text-xl">
//                   {" "}
//                   Error {error.status}:
//                   <i className="text-red-500 text-xl ml-3">
//                     {error.statusText || error.message}
//                   </i>
//                 </p>
//                 <p className="text-slate-400">
//                   Whoops, this is embarrassing. <br />
//                   Looks like the page you were looking for was not found.
//                 </p>

//                 <div className="mt-4">
//                   <div className="flex items-center justify-center mt-6 gap-x-3">
//                     <Button onClick={() => navigate(-1)} className="min-w-32">
//                       Go Back
//                     </Button>

//                     <Button className="min-w-32 bg-primary text-white hover:bg-primary/90 font-bold py-3 px-6 rounded-lg">
//                       <Link to={"/"}>Back to Home</Link>
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//               <div className="text-center mt-8">
//                 <p className="mb-0 text-slate-400">
//                   {new Date().getFullYear()}@ Inkwell. Design with{" "}
//                   <Heart className="inline-block text-red-500" size={20} /> by{" "}
//                   <Link
//                     to={"https://github.com/JuborajSujon"}
//                     target="_blank"
//                     className="text-reset underline">
//                     JuborajSujon
//                   </Link>
//                   .
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default ErrorPage;
