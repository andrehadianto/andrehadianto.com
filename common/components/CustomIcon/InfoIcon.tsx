import { CustomIcon, CustomIconProps } from "@/common/components/CustomIcon";

export const InfoIcon = ({ className }: CustomIconProps) => {
  return (
    <CustomIcon
      className={className}
      height="24"
      viewBox="0 0 24 24"
      width="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </CustomIcon>
  );
};
