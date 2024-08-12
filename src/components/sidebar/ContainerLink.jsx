const LayoutComponent = ({ children }) => {
  return (
    <div
      className={`group relative grid grid-cols-1 gap-2.5
                rounded-sm py-2 px-4 font-medium text-bodydark1
                duration-300 ease-in-out focus:bg-graydark
                  `}
    >
      {children}
    </div>
  );
};

export default LayoutComponent;
