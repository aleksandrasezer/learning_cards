import React, {useState} from "react";
import s from './Pack.module.css'
import {PackResponseType} from "../../../../m2-bll/packs-reducer";
import {NavLink} from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {green} from "@material-ui/core/colors";
import {ModalForPacks} from "../../Modal/ModalPacks/ModalForPacks";
import {ModalDeleteItem} from "../../Modal/ModalDelete/ModalDeleteItem";
import SchoolIcon from '@material-ui/icons/School';
import {LightTooltip} from "../../../common/LightToolTip";

export const Pack: React.FC<PackPropsType> = React.memo((props) => {

    const updateTime = new Date(props.updated).toLocaleDateString(['ban', 'id'])

    const delPack = () => {
        props.delPack(props._id)
    }
    const updatePack = (newPackName: string) => {
        props.updatePack(props._id, newPackName)
    }


    // Update pack modal
    const [editPackModal, setEditPackModal] = useState<boolean>(false);
    const openAddEditPackModal = () => {
        setEditPackModal(true)
    }
    const closeAddEditPackModal = () => {
        setEditPackModal(false)
    }

    // Delete pack modal
    const [deletePackModal, setDeletePackModal] = useState<boolean>(false);
    const openDeletePackModal = () => {
        setDeletePackModal(true)
    }
    const closeDeletePackModal = () => {
        setDeletePackModal(false)
    }

    // ОнКлик на кнопку Edit
    // const updatePack = () => {
    //   props.updatePacks(props.updatePacks.cardsPack)
    // }
    return (
        <div className={s.packItem}>
            <div className={s.packSpecification}>{props.user_name}</div>
            <div className={s.packSpecification}>{props.name}</div>
            <div className={s.packSpecification}>{props.cardsCount}</div>
            <div className={s.packSpecification}>{updateTime}</div>
            <div className={s.packSpecification}>
                <NavLink to={`/cards/${props._id}`} className={s.cardsLink}>cards</NavLink></div>
            <div className={s.packSpecification}>
                <NavLink to={`/learn/${props._id}`}>
                    <LightTooltip title='Learn'>
                        <span  style={{cursor: 'pointer'}}><SchoolIcon/></span>
                    </LightTooltip>
                </NavLink>
            </div>

            <div className={s.packSpecification}>
                {props.user_id === props.currentUserId
                    ? <LightTooltip title='Edit pack'><span style={{cursor: 'pointer'}}>
                        <EditIcon onClick={openAddEditPackModal} style={{color: green[500]}}/></span>
                    </LightTooltip> : ''}
            </div>
            <div className={s.packSpecification}>
                {props.user_id === props.currentUserId
                    ? <LightTooltip title='Delete pack'><span style={{cursor: 'pointer'}}>
                        <DeleteIcon onClick={openDeletePackModal} color='secondary'/></span>
                    </LightTooltip> : ''}
            </div>

            {editPackModal && <ModalForPacks
                closeAddEditPackModal={closeAddEditPackModal}
                addNewPack={updatePack}
                titlePack={props.name}
            />}

            {deletePackModal && <ModalDeleteItem
                closeDeleteModal={closeDeletePackModal}
                deleteItem={delPack}
                title={`Are you sure you want to delete pack '${props.name}'?`}
            />}

        </div>
    )
})

//types
type PackPropsType = PackResponseType &
    {
        updatePack: (packId: string, newPackName: string) => void
        delPack: (id: string) => void
        currentUserId: string
    }