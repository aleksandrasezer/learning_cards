import React, {ChangeEvent, useCallback, useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux";
import {Pagination} from '@material-ui/lab';
import {
    addPackTC,
    delPackTC,
    getPacksTC,
    setCurrentPageAC,
    setMaxCardsCountAC,
    setMinCardsCountAC, setNameAC, setSortPacksAC,
    setUserIdAC,
    updatePackTC
} from "../../../m2-bll/packs-reducer";
import {Pack} from "./Pack/Pack";
import {AppStoreType} from "../../../m2-bll/store";
import st from './Packs.module.css'
import SuperButton from "../../superComponents/c2-SuperButton/SuperButton";
import {Login} from "../Login/Login";
import {ModalForPacks} from "../Modal/ModalPacks/ModalForPacks";
import {Slider} from "@material-ui/core";
import SuperInputText from "../../superComponents/c1-SuperInputText/SuperInputText";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import SearchIcon from '@material-ui/icons/Search';


export const Packs: React.FC = React.memo(() => {

    const dispatch = useDispatch()

    const {cardPacks, totalPacksCount, pageSize, currentPage, minCardsCount, maxCardsCount, sortPacks, userId}
        = useSelector((state: AppStoreType) => state.packs)
    const isLoggedIn = useSelector((state: AppStoreType) => state.auth.isLoggedIn)
    const _id = useSelector((state: AppStoreType) => state.auth.userData._id)

    const [searchText, setSearchText] = useState('')

    useEffect(() => {
        dispatch(getPacksTC())
    }, [dispatch, minCardsCount, maxCardsCount])

    // add pack modal
    const [addPackModal, setAddPackModal] = useState<boolean>(false);
    const openAddEditPackModal = () => {
        setAddPackModal(true)
    }
    const closeAddEditPackModal = () => {
        setAddPackModal(false)
    }

    //add/del/update packs
    const addPack = (newPackName: string) => {
        dispatch(addPackTC({name: newPackName}))
    }
    const delPack = useCallback(function (id: string) {
        dispatch(delPackTC(id))
    }, [dispatch])
    const updatePack = useCallback(function (packId: string, newPackName: string) {
        dispatch(updatePackTC(packId, newPackName))
    }, [dispatch])


    //sort
    const sortByLastUpdate = () => {
        dispatch(setSortPacksAC('0updated'))
        dispatch(getPacksTC())
    }
    const sortByFirstUpdate = () => {
        dispatch(setSortPacksAC('1updated'))
        dispatch(getPacksTC())
    }
    const sortPacksByUpdate = sortPacks === '1updated'
        ? <span style={{cursor: 'pointer'}}><ArrowDownwardIcon onClick={sortByLastUpdate} color='primary' /></span>
        : <span style={{cursor: 'pointer'}}><ArrowUpwardIcon onClick={sortByFirstUpdate} color='primary'/></span>


    //my/all packs
    const [myPacks, setMyPacks] = useState(userId === _id)
    const activeMyPacksButton = myPacks ? `${st.activeButton}` : ''
    const activeAllPacksButton = !myPacks ? `${st.activeButton}` : ''
    const showMyPacks = () => {
        dispatch(setUserIdAC(_id))
        dispatch(getPacksTC())
        setMyPacks(true)
    }
    const showAllPacks = () => {
        dispatch(setUserIdAC(''))
        dispatch(getPacksTC())
        setMyPacks(false)
    }

    //onChangeSlider
    const onChangeSlider = (event: ChangeEvent<{}>, newValue: number | number[]) => {
        if (newValue instanceof Array) {
            dispatch(setMinCardsCountAC(newValue[0]))
            dispatch(setMaxCardsCountAC(newValue[1]))
        }
    }

    //search
    const onSearchChangeHandler = (value: string) => setSearchText(value)
    const search = () => {
        dispatch(setNameAC(searchText))
        dispatch(getPacksTC())
        setSearchText('')
        dispatch(setNameAC(''))
    }

    //pagination
    let pages = []
    let pagesCount = Math.ceil(totalPacksCount / pageSize)
    for (let i = 1; i <= pagesCount; i++) pages.push(i)
    const onPageChangedHandler = (p: number) => {
        dispatch(setCurrentPageAC(p))
        dispatch(getPacksTC())
    }

    //list of packs
    const mappedPacks = cardPacks && cardPacks.map((p, i) => <Pack
        key={i}
        {...p}
        delPack={delPack}
        updatePack={updatePack}
        currentUserId={_id}
    />)


    if (!isLoggedIn) {
        return <Login/>
    }
    console.log('Packs render')
    return (
        <div>
            <div className={st.title}>
                <h1>Packs</h1>
            </div>
            <div className={st.packsContainer}>

                <div className={st.packsField}>
                    <div className={st.packContents}>
                        <div>username</div>
                        <div>name</div>
                        <div>count</div>

                        <div>{sortPacksByUpdate}</div>
                        <div>update</div>
                        <div><SuperButton onClick={openAddEditPackModal}>add</SuperButton>


                    </div>
                    </div>
                    <div>
                        {mappedPacks}
                    </div>
                </div>

                {addPackModal && <ModalForPacks
                    closeAddEditPackModal={closeAddEditPackModal}
                    addNewPack={addPack}
                    placeholder='new pack name'
                />}

                <div className={st.sidebar}>

                    <div className={st.showMyAllPacks}>
                        <span className={activeMyPacksButton}>
                        <SuperButton onClick={showMyPacks}> my packs </SuperButton> </span>

                        <span className={activeAllPacksButton}>
                        <SuperButton onClick={showAllPacks}> all packs </SuperButton> </span>
                    </div>

                    <div className={st.filterByCardsCount}>
                        <Slider
                            style={{margin: '0', padding: '0'}}
                            value={[minCardsCount, maxCardsCount]}
                            onChangeCommitted={onChangeSlider}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                            name='cards count'
                            min={0}
                            max={20}
                        />
                    </div>

                    <div className={st.search}>
                        <SuperInputText
                            onChangeText={onSearchChangeHandler}
                            onEnter={search}
                            placeholder='search packs'
                            value={searchText}/>
                        <SearchIcon onClick={search}/>
                    </div>

                </div>

            </div>

            <div className={st.paginator}>
                <Pagination count={pagesCount}
                            boundaryCount={1}
                            defaultPage={1}
                            page={currentPage}
                            onChange={(e: ChangeEvent<any>, p: number) => onPageChangedHandler(p)}/>
            </div>
        </div>
    )
})