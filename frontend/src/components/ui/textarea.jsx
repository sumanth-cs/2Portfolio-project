// import * as React from "react";
// import { cn } from "../../utils/utils";

// const Textarea = React.forwardRef(({ className, ...props }, ref) => {
//   return (
//     <textarea
//       className={cn(
//         "flex min-h-[80px] w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
//         className
//       )}
//       ref={ref}
//       {...props}
//     />
//   );
// });
// Textarea.displayName = "Textarea";

// export { Textarea };

import * as React from "react";
import { cn } from "../../utils/utils";

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-primary bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };