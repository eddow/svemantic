# Partial configurations

All attributes are optional.
Most of the time, each part specifies only one characteristic, a complex way.

## Color

### Attributes

- `color` red | orange | yellow | olive | green | teal | blue | violet | purple | pink | brown | grey | black

### Flags

- `primary`
- `secondary`
- `positive`
- `negative`
- `inverted`

## Loading

Loading can be specified by flags but also by giving a string value to `loading` like `"slow double"`.

### Flags

- `loading`
- `slow` | `fast`
- `double` | `elastic`

## Numbers

Only one out of all configurations

### Attributes

- `number` 2 ... 16 or "two" ... "sixteen"

### Flags

- two ... sixteen

## Position

### Attributes

- `attached` top | bottom | left | right
`attached` can also be a composition "[vertical] [horizontal]" like `"top right"`

### Flags

- `fluid` Take the whole width of the container