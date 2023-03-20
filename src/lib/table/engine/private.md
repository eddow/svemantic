# Table generation

- `MetaRow` collects all column data;

For each cell,
- `Switch` does use :
  - use `Select` to collect all the rendering cells
  - select one among the case to render and its index
  - use `Case` to render such