// import * as React from "react";
// import { cn } from "../../utils/utils";

// const Label = React.forwardRef(({ className, ...props }, ref) => (
//   <label
//     ref={ref}
//     className={cn("text-sm font-medium text-red-700", className)}
//     {...props}
//   />
// ));
// Label.displayName = "Label";

// export { Label };

import * as React from "react";
import { cn } from "../../utils/utils";

const Label = React.forwardRef(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn("text-sm font-medium text-primary", className)}
    {...props}
  />
));
Label.displayName = "Label";

export { Label };