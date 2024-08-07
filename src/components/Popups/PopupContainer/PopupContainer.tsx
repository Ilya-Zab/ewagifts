import React, { useEffect } from "react";
import { popupClosed } from "@/store/reducers/PopupSlice";
import { useDispatch } from "react-redux";
import MobileSearchPopup from "@/components/Popups/MobileSearchPopup";
import HamburgerMenu from "@/components/Popups/HamburgerMenu";
import SwiperPopup from "@/components/Popups/SwiperPopup/SwiperPopup";
import { useAppSelector } from "@/hooks/redux";

const unscrollablePopups = ['mobile-search', 'hamburger-menu', 'swiper-popup'];

const PopupContainer = () => {
    const dispatch = useDispatch();

    const popup = useAppSelector(state => state.Popup);

    useEffect(() => {
        if (unscrollablePopups.some(popupName => popup === popupName)) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [popup]);

    const closePopup = () => {
        dispatch(popupClosed());
    }

    switch (popup) {
        case 'mobile-search': {
            return (
                <MobileSearchPopup onClose={closePopup} />
            )
        }
        case 'hamburger-menu': {
            return (
                <HamburgerMenu onClose={closePopup} />
            )
        }
        case 'swiper-popup': {
            return (
                <SwiperPopup onClose={closePopup} />
            )
        }
    }
}

export default PopupContainer;