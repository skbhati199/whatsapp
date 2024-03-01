import { Ionicons } from '@expo/vector-icons';
import { View, Text } from 'react-native';

export type BoxedIconProps = {
    name: typeof Ionicons.defaultProps;
    backgroundColor: string;
}

const BoxedIcon = ({name, backgroundColor}: BoxedIconProps) => {
    return (
        <View style={{ backgroundColor, padding: 4, borderRadius: 6}}>
            <Ionicons name={name} size={24} color="white" />
        </View>
    )
}

export default BoxedIcon;