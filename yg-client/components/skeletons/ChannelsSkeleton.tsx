import ReactPlaceholder from "react-placeholder";
import { RectShape } from "react-placeholder/lib/placeholders";
import "react-placeholder/lib/reactPlaceholder.css";

const customPlaceholder = (
  <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
    {Array.from({ length: 40 }).map((_, index) => (
      <RectShape
        key={index}
        color="#E0E0E0"
        className="bg-white shadow-sm w-full h-32 items-center rounded-md"
        style={{
          height: "150px",
        }}
      />
    ))}
  </div>
);

type ChannelsSkeltetonProps = {
  children: React.ReactNode;
  ready: boolean;
};

const ChannelsSkelteton: React.FC<ChannelsSkeltetonProps> = ({
  children,
  ready,
}) => (
  <ReactPlaceholder
    customPlaceholder={customPlaceholder}
    showLoadingAnimation={true}
    ready={ready}
  >
    {children}
  </ReactPlaceholder>
);

export default ChannelsSkelteton;
