import { useMessage, useDialog, NIcon } from 'naive-ui'
import { FactionKey } from '../utilities/types';
import { h } from 'vue';
import { MoonOutline} from '@vicons/ionicons5';
import { Sunny } from '@vicons/carbon';

export default function useNotifs() {

  const dialog = useDialog();
  const message = useMessage();

  const createNotification = (message: string, faction: FactionKey, cooperative: boolean) => {
    if (cooperative) {
      dialog.create({
        content: message,
        positiveButtonProps: { size: 'small', color: '#09F5AE', textColor: '#047D59' },
        icon: () => h(NIcon, { color: '#09F5AE'}, { default: () => h(Sunny) }),
        style: { color: '#09F5AE', backgroundColor: '#047D59', border: '1px solid #09F5AE', borderRadius: '10px' },
        maskClosable: false,
        closable: false,
        positiveText: "OK",
      });
    } else if (faction === 'sun') {
      dialog.create({
        content: message,
        positiveButtonProps: { size: 'small', color: '#e9c46a', textColor: '#9e2a2b' },
        icon: () => h(NIcon, { color: '#e9c46a'}, { default: () => h(Sunny) }),
        style: { color: '#e9c46a', backgroundColor: '#9e2a2b', border: '1px solid #e9c46a', borderRadius: '10px' },
        maskClosable: false,
        closable: false,
        positiveText: "OK",
      });
    } else {
      dialog.create({
        content: message,
        positiveButtonProps: { size: 'small', color: '#caf0f8', textColor: '#264653' },
        icon: () => h(NIcon, { color: '#caf0f8'}, { default: () => h(MoonOutline) }),
        style: { color: '#caf0f8', backgroundColor: '#264653', border: '1px solid #caf0f8', borderRadius: '10px' },
        maskClosable: false,
        closable: false,
        positiveText: "OK",
      });
    }
  }

  const createMessage = (msg: string, faction: FactionKey) => {
    if (faction === 'sun') {
      message.success(
        msg,
        {
          icon: () => h(NIcon, { color: '#e9c46a' }, { default: () => h(Sunny) }),
          render: () => h(
            'div',
            {
              style: { color: '#e9c46a', backgroundColor: '#9e2a2b', border: '1px solid #e9c46a', borderRadius: '10px', padding: '8px'
              }
            },
            [
              h('span', {
                style: 'margin-right: 6px'
              }, [
                h(NIcon, { color: '#e9c46a' }, { default: () => h(Sunny) })
              ]),
              msg,
            ]
          ),          
        }
      )      
    } else {
      message.success(
        msg,
        {
          icon: () => h(NIcon, { color: '#caf0f8' }, { default: () => h(MoonOutline) }),
          render: () => h(
            'div',
            {
              style: { color: '#caf0f8', backgroundColor: '#264653', border: '1px solid #caf0f8', borderRadius: '10px', padding: '8px'
              }
            },
            [
              h('span', {
                style: 'margin-right: 6px'
              }, [
                h(NIcon, { color: '#caf0f8' }, { default: () => h(MoonOutline) })
              ]),
              msg
            ]
          ),
        }
      )
    }
  }

  return { createMessage, createNotification }
}
