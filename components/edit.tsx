import React, { useState, useEffect } from 'react'
import { EditPropertyProps, BasePropertyComponent, useTranslation } from 'adminjs'
import { Box, Button, Text } from '@adminjs/design-system'

const PasswordEdit: React.FC<EditPropertyProps> = (props) => {
  const { onChange, property, record, resource } = props
  const { translateButton: tb } = useTranslation()

  const [showPassword, togglePassword] = useState(false)

  useEffect(() => {
    if (!showPassword) {
      onChange(property.name, '')
    }
  }, [onChange, property, showPassword])

  // For new records always show the property
  if (!record.id) {
    return <BasePropertyComponent.Password.Edit {...props} />
  }

  return (
    <Box>
      {showPassword && <BasePropertyComponent.Password.Edit {...props} />}
      <Box mb="xl">
        <Text textAlign="center">
          <Button onClick={() => togglePassword(!showPassword)} type="button">
            {showPassword ? tb('cancel', resource.id) : tb('changePassword', resource.id)}
          </Button>
        </Text>
      </Box>
    </Box>
  )
}

export default PasswordEdit
