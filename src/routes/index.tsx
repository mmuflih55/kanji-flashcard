import { FC } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from "@/components/modules/notFound";
import KanjiFlashCard from "@/components/modules/kanjiFlashCard";
import Memorize from "@/components/modules/memorize";

const Router: FC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <KanjiFlashCard />,
      errorElement: <NotFoundPage />,
    },
    {
      path: "/memorize",
      element: <Memorize />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default Router;
