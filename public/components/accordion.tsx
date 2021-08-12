import { FunctionComponent, toChildArray } from "preact";

export const AccordionPane: FunctionComponent<{
  title: string;
  icon?: string;
  open: boolean;
  onToggle: (next: boolean) => void;
}> = (props) => {
  // Tell the parent that the user opened or closed the pane
  const emitToggle = (event: MouseEvent) => {
    event.preventDefault();
    if (props.onToggle) {
      props.onToggle(!props.open);
    }
  };

  return (
    <details
      open={props.open}
      className="accordion"
      onClick={(event) => !props.open && emitToggle(event)}
    >
      <summary onClick={emitToggle}>
        <section className="container p-4">
          <h2 className="text-base font-bold leading-none capitalize">
            {props.icon && (
              <span className="w-[var(--accordion-details-icon)] h-[var(--accordion-details-icon)] inline-flex items-center justify-center mr-2 bg-gray-100 rounded-full">
                {props.icon}
              </span>
            )}
            {props.title}
          </h2>
        </section>
      </summary>
      <div className="container my-10 normal:my-20 px-4">{props.children}</div>
    </details>
  );
};

export const Accordion: FunctionComponent<{
  currentPane: string;
  onPaneChange: (next: string) => void;
  className?: string;
}> = (props) => {
  // TODO: Types for children
  // TODO: Validate child ids

  // Tell the parent that a different pane should be active
  const emitPaneToggle = (id: string, open: boolean) => {
    if (!(props.onPaneChange && id && open)) {
      return;
    }
    props.onPaneChange(id);
  };

  const children = toChildArray(props.children);

  return (
    <div
      className={`normal:flex normal:space-x-2 space-y-2 normal:space-y-0 ${props.className}`}
    >
      {children.map((child) => (
        <AccordionPane
          {...child.props}
          open={child.props.id && child.props.id === props.currentPane}
          onToggle={(open) => emitPaneToggle(child.props.id, open)}
        />
      ))}
    </div>
  );
};
