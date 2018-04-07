
import { PermissionsAndroid , Platform} from 'react-native';

export async function requestStoragePermission() {

    if(Platform.OS === 'android') {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    'title': 'Share and save to gallery',
                    'message': 'Needs Storage Permission.'
                }
            );

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    }else {
        return true;
    }
}

