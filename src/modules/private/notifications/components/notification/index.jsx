import React, { useEffect } from "react";
import { View } from "react-native";
import useDarkMode from "@/shared/hooks/useDarkMode";
import {_styles} from './styles'
import Icon from "@/shared/components/icon";
import { mail, sale, shippingCart, shoppingBag, wallet } from "@/shared/assets/icons";
import Typography from "@/shared/components/typography";
import { NotificationDTO } from "@/shared/DTO";

export default function Notification({notification}) {
  const {isDarkMode} = useDarkMode()
  const styles = _styles(isDarkMode)
  function renderIcon() {
    const icons = {
      'payment': shippingCart,
      'new_service': shoppingBag,
      'wallet': wallet,
      'promo': sale
    }
    // @ts-ignore
    return icons['promo']
  }

  return (
    <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Icon customStyles={styles.iconSize} icon={renderIcon()} />
        </View>
      <View style={styles.containerInfo}>
        <Typography style={styles.title} translate={false}>{notification?.data?.title}</Typography>
        <Typography style={styles.description} translate={false}>
          {notification?.data?.body}
        </Typography>
      </View>
    </View>
  )
}
