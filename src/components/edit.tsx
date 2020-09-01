import React, { useState, useEffect } from 'react'
import { EditPropertyProps, BasePropertyComponent } from 'admin-bro'
import { Box, Button, Text } from '@admin-bro/design-system'

const PasswordEdit: React.FC<EditPropertyProps> = (props) => {
  const { onChange, property, record } = props

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
            {showPassword ? 'Cancel' : 'Change password'}
          </Button>
        </Text>
      </Box>
    </Box>
  )
}

export default PasswordEdit
