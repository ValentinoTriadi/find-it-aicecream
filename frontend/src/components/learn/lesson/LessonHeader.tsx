// src/pages/lesson/header.tsx
type HeaderProps = {
  title: string;
};

export const LessonHeader = ({ title }: HeaderProps) => {
  return (
    <div className="sticky top-0 mb-5 flex items-center justify-center border-b-2 bg-white pb-3 text-[#0a2540] lg:z-50 lg:mt-[-28px] lg:pt-[28px]">
      <h1 className="text-lg font-bold">{title}</h1>
    </div>
  );
};
