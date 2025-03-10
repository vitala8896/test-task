import { Meta, StoryObj } from "@storybook/react";
import Select from "../components/Select";
import { useForm } from "react-hook-form";

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "A custom select component for choosing Pokémon with filtering.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: () => {
    const { control } = useForm({ defaultValues: { pokemonTeam: [] } });
    return <Select name="pokemonTeam" control={control} label="Select Pokémon" maxSelections={4} />;
  },
  parameters: {
    docs: {
      storyDescription: "Default select component with Pokémon filtering.",
    },
  },
};