import { connect, RenderFieldExtensionCtx } from "datocms-plugin-sdk";
import "datocms-react-ui/styles.css";
import ConfigScreen from "./entrypoints/ConfigScreen";
import { render } from "./utils/render";
import {
  Canvas,
  Dropdown,
  Button,
  CaretUpIcon,
  CaretDownIcon,
  DropdownMenu,
  DropdownOption,
  DropdownSeparator,
} from "datocms-react-ui";

const Foobar = ({ ctx }: { ctx: RenderFieldExtensionCtx }) => {
  return (
    <Canvas ctx={ctx}>
      <Dropdown
        renderTrigger={({ open, onClick }) => (
          <Button
            onClick={onClick}
            rightIcon={open ? <CaretUpIcon /> : <CaretDownIcon />}
          >
            Options
          </Button>
        )}
      >
        <DropdownMenu>
          <DropdownOption onClick={() => {}}>Edit</DropdownOption>
          <DropdownOption disabled onClick={() => {}}>
            Duplicate
          </DropdownOption>
          <DropdownSeparator />
          <DropdownOption red onClick={() => {}}>
            Delete
          </DropdownOption>
        </DropdownMenu>
      </Dropdown>
    </Canvas>
  );
};

connect({
  renderConfigScreen(ctx) {
    return render(<ConfigScreen ctx={ctx} />);
  },
  manualFieldExtensions() {
    console.log("manualFieldExtensions");
    return [
      {
        id: "foobar",
        name: "Foobar: Just a test",
        type: "editor",
        fieldTypes: ["string"],
      },
    ];
  },
  renderFieldExtension(fieldExtensionId: string, ctx: RenderFieldExtensionCtx) {
    switch (fieldExtensionId) {
      case "foobar":
        return render(<Foobar ctx={ctx} />);
    }
  },
});
