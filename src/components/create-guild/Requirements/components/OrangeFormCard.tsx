import { FormControl, FormLabel, Input } from "@chakra-ui/react"
import FormErrorMessage from "components/common/FormErrorMessage"
import { Controller, useFormContext } from "react-hook-form"
import { Requirement } from "types"

type Props = {
  index: number
  field: Requirement
}

const OrangeFormCard = ({ index, field }: Props) => {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  return (
    <>
      <FormControl isRequired isInvalid={errors?.requirements?.[index]?.data?.id}>
        <FormLabel>Campaign ID:</FormLabel>

        <Controller
          name={`requirements.${index}.data.id` as const}
          control={control}
          rules={{ required: "This field is required." }}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Input
              type="text"
              ref={ref}
              value={value ?? ""}
              placeholder="Paste campaign link"
              onChange={(newChange) => {
                const newValue = newChange.target.value
                const split = newValue.split("/")
                onChange(split[split.length - 1])
              }}
              onBlur={onBlur}
            />
          )}
        />

        <FormErrorMessage>
          {errors?.requirements?.[index]?.data?.id?.message}
        </FormErrorMessage>
      </FormControl>
    </>
  )
}

export default OrangeFormCard
