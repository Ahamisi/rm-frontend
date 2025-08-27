declare module '@/views/Components/procurement/ui/SelectField.vue' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<{
    modelValue: string;
    options: Array<{ value: string; label: string }>;
    placeholder?: string;
  }, {}, any>;
  export default component;
}
