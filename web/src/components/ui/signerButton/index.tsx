import { useSigner }      from '@/hooks/useSigner'
import { useMediaQuery }  from '@mantine/hooks'
import {
  ColorSwatch,
  Group,
  ActionIcon
} from '@mantine/core';

import {
  IconKey, 
} from '@tabler/icons-react'

interface Props {
  side_opened ?: boolean;
  side_toggle_desk ?: () => void; 
  side_toggle_mobi ?: () => void; 
}


interface SwatchProps {
  id : string
}

export default function SignerButton (props: Props) {
  
  const { signer } = useSigner()
  const isMobile = useMediaQuery('(max-width: 768px)');

  const handleToggle = () => {
    if (isMobile) {
      props.side_toggle_mobi?.();
    } else {
      props.side_toggle_desk?.();
    }
  };

  return (
    <Group
      style={{
        position: 'fixed',
        bottom: '90px',
        right: '10px', 
        zIndex: 999, 
    }}>
    { signer !== null && <IdSwatch id={signer.pubkey} /> }
      <ActionIcon 
        bg={'#0068FD'}
        size={35}
        variant    = "filled" 
        color      = "blue" 
        aria-label = "Signer" 
        onClick={ handleToggle }
        style={{
          borderRadius: '10px'
        }}
      >
        <IconKey style={{ width  : '70%', height : '70%' }} size={45} />
      </ActionIcon>
    </Group>
  );
}

function IdSwatch ({ id } : SwatchProps) {
  return (
    <Group gap={0} w={70}>
      <ColorSwatch size={14} color={`#${id.slice(0, 6)}`}     radius={0}></ColorSwatch>
      <ColorSwatch size={14} color={`#${id.slice(6, 12)}`}    radius={0}></ColorSwatch>
      <ColorSwatch size={14} color={`#${id.slice(12, 18)}`}   radius={0}></ColorSwatch>
      <ColorSwatch size={14} color={`#${id.slice(18, 24)}`}   radius={0}></ColorSwatch>
      <ColorSwatch size={14} color={`#${id.slice(24, 30)}`}   radius={0}></ColorSwatch>
      <ColorSwatch size={14} color={`#${id.slice(30, 36)}`}   radius={0}></ColorSwatch>
      <ColorSwatch size={14} color={`#${id.slice(36, 42)}`}   radius={0}></ColorSwatch>
      <ColorSwatch size={14} color={`#${id.slice(42, 48)}`}   radius={0}></ColorSwatch>
      <ColorSwatch size={14} color={`#${id.slice(48, 54)}`}   radius={0}></ColorSwatch>
      <ColorSwatch size={14} color={`#${id.slice(54, 60)}`}   radius={0}></ColorSwatch>
    </Group>
  )
}
