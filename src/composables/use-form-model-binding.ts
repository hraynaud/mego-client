export interface BaseProps {
  modelValue?: string;
  label?: string;
  rules?: ((val: string) => boolean | string)[];
  customClass?: string;
}

// export function useModelBinding() {
//   const updateValue = (
//     emit: (event: 'update:modelValue', ...args: unknown[]) => void
//   ) => {
//     return (value: string | number | null) => {
//       emit('update:modelValue', value);
//     };
//   };

//   return { updateValue };
// }
