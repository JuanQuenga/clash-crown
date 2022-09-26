import Image from "next/image";

interface StatItemProps {
  label: string;
  value: string | number;
  icon: string;
}

const StatItem = ({ label, value, icon }: StatItemProps) => {
  return (
    <div>
      <div className="flex flex-row p-4">
        <div className="mr-4">
          <Image
            src={`/images/icons/${icon}.png`}
            alt={label}
            width={50}
            height={50}
          />
        </div>
        <div className="flex flex-col">
          <span className="font-supercell">{value}</span>
          <small className="text-light">{label}</small>
        </div>
      </div>
    </div>
  );
};

export default StatItem;
