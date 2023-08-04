import { cn } from "@/lib/utils";

type PageProps = React.HTMLAttributes<HTMLDivElement>;

export default function PageShell(props: PageProps) {
  const {children, className, ...sectionProps} = props;
  return(
    <section {...sectionProps} className={cn("container mx-auto h-full flex items-center", className)}>
      {children}
    </section>
  )
}