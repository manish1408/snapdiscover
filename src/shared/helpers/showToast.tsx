// import { useToast } from 'react-native-toast-notifications';
import { Toast } from 'react-native-toast-notifications';
import { SuccessIcon, WarningIcon, DangerIcon } from '../assets/icons-8';
import Icon from '../components/icon';
const showToast = (message: string, { type = 'normal', placement = 'top' }) => {
	const options = {
		type: type,
		placement: placement,
		duration: 4000,
		animationType: 'slide-in',
		successColor: 'rgb(46,125,50)',
		dangerColor: 'rgb(211,47,47)',
		warningColor: 'rgb(237,108,02)',
		normalColor: 'rgb(51,51,51)',
		// icon:{<Icon />},
		successIcon: <Icon icon={SuccessIcon} />,
		dangerIcon: <Icon icon={DangerIcon} />,
		warningIcon: <Icon icon={WarningIcon} />,
		textStyle: { fontSize: 18 },
		offset: 50, // offset for both top and bottom toasts
		offsetTop: 30,
		offsetBottom: 40,
		style: { borderRadius: 16, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 },
	};
	Toast.show(message, options);
};

export default showToast;

// Usage
// showToast('message', {type:'success',placement:'top'});
// showToast('message', {type:'danger',placement:'top'});
// showToast('message', {type:'warning',placement:'bottom'});
// showToast('message',{type:'normal',placement:'bottom'});
