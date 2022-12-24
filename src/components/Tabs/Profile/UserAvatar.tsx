import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { Avatar } from 'react-native-elements';
import globalStyles from '../../../common';

const UserAvatar: FC<{ size?: number; color?: string; username?: string }> = ({
  size,
  color,
  username,
}) => {
  return (
    <View style={styles.avatar}>
      <Avatar
        size={size || 120}
        title={username!.slice(0, 2)}
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
