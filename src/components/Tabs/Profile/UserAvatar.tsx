import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { Avatar } from 'react-native-elements';
import globalStyles from '../../../common';
import { useAuth } from '../../../context/auth-context';

const UserAvatar: FC<{ size?: number; color?: string }> = ({ size, color }) => {
  const currentUser = useAuth();
  return (
    <View style={styles.avatar}>
      <Avatar
        size={size || 120}
        // title={currentUser?.username.charAt(0).toUpperCase()}
        // title={currentUser?.username}
        title={'Bedru'.slice(0, 2).toUpperCase()}
        rounded
        activeOpacity={0.7}
        icon={{ name: 'user', type: 'font-awesome' }}
        containerStyle={{ backgroundColor: color || globalStyles.colors.gray3 }}
      />
    </View>
  );
};

export default UserAvatar;

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
  },
});
