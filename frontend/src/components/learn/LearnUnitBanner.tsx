// src/pages/learn/unit-banner.tsx
type UnitBannerProps = {
    title: string;
    description: string;
  };
  
  export const UnitBanner = ({ title, description }: UnitBannerProps) => {
    return (
    <div className="flex w-full items-center justify-between rounded-xl bg-[#5bb4e5] p-5 text-white shadow-lg">
        <div className="space-y-2.5">
          <h3 className="text-2xl font-bold">{title}</h3>
          <p className="text-lg text-white">{description}</p>
        </div>
      </div>
    );
  };