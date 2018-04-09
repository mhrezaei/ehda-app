
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
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
            return false;
        }
    }else {
        return true;
    }
}

