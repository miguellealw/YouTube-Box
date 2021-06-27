import useUser from "../../utils/auth/useUser";
import DashboardNavigation from "../../components/DashboardNavigation";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

interface AuthedLayoutProps {
  tw_className?: string;
}

const AuthedLayout: React.FC<AuthedLayoutProps> = ({
  children,
  tw_className = "",
  ...props
}) => {
  const { isLoading } = useUser({
    redirectTo: "/login",
  });
  // const categoriesData = useCategories()

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center font-bold text-red-500">
        Dashboard Loading...
      </div>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-full min-h-screen bg-gray-100">
        <div
          className={`${tw_className === "" ? "w-1/3 m-auto" : tw_className}`}
          {...props}
        >
          {/* <DashboardNavigation categoriesData={categoriesData}/>			 */}
          <DashboardNavigation />
          {children}
        </div>
      </div>
    </DndProvider>
  );
};

export default AuthedLayout;
