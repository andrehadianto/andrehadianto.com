import { CustomIcon, CustomIconProps } from "@/common/components/CustomIcon";

export const CrossIcon = ({ className }: CustomIconProps) => {
  return (
    <CustomIcon
      className={className}
      height="16"
      viewBox="0 0 16 16"
      width="16"
    >
      <path
        d="M12 4L4 12M4 4L12 12"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
    </CustomIcon>
  );
};
