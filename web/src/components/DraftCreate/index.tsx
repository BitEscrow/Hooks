import { useEffect, useState } from 'react'

import {
  Box,
  Button,
  Card,
  Divider,
  Group,
  JsonInput,
  NativeSelect,
  Text,
  TextInput,
  Title,
  Space
} from '@mantine/core'

import presets_json from './presets.json' assert { type: 'json' }

type PresetEnum = keyof typeof presets_json

export default function CreateDraftView () {

  const [ draft, setDraft   ] = useState({})
  const [ json, setJson     ] = useState('')
  const [ preset, setPreset ] = useState('default')
  const [ isValid, setValid ] = useState(false)

  const apply_preset = () => {
    const data = presets_json[preset as PresetEnum]
    setJson(JSON.stringify(data, null, 2))
  }

  const create_draft = () => {
    try {
      const data = JSON.parse(json)
      setDraft(data)
    } catch {
      return
    }
  }

  useEffect(() => {
    if (json === '') apply_preset()
  }, [ json ])

  useEffect(() => {
    try {
      JSON.parse(json)
      setValid(true)
    } catch {
      setValid(false)
    }
  }, [ json ])

  return (
    <Card style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
      <Group style={{ width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <Title order={2} mb={15}>Create a new Draft</Title>
          <Text c="dimmed" style={{ marginBottom: '20px' }} maw='500px'>
            Create a new draft session for others to join.
          </Text>
        </div>
      </Group>
      <Divider mb={30} mt={20}/>
      <Box maw = {300}>
        <NativeSelect
          label="Example Templates"
          description="Pre-built JSON templates to start with."
          value={preset}
          onChange={(e) => setPreset(e.currentTarget.value)}
          data={Object.keys(presets_json)}
        />
        <Space h="xs" />
        <Button
          maw = {150}
          variant="filled"
          onClick={() => apply_preset()}
        >
          Apply
        </Button>
      </Box>
      <Divider mb={30} mt={20}/>
      <Box maw={700}>
        <JsonInput
          label="Draft Template"
          description="The JSON template for your draft session."
          placeholder="copy/paste your proposal JSON"
          validationError="Invalid JSON"
          formatOnBlur
          autosize
          minRows={4}
          maxRows={15}
          value={json}
          onChange={(e) => setJson(e)}
          styles={{ input : { color : (isValid) ? 'black' : 'red' } }}
        />
      </Box>
      <Space h="xs" />
      <Button
        maw = {150}
        variant="filled"
        onClick={() => create_draft()}
        disabled={!isValid}
      >
        Create Draft
      </Button>
  </Card>
  )
}
