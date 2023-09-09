"use client";
import { useEffect, useState } from 'react';
import exp from "constants"
import styles from './global_branding_icon.module.css'
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, height } from "@fortawesome/free-solid-svg-icons/faClose";
import { faFile, faFileArrowUp, faFileUpload, faInfo, faPlus, faUpload, faX } from "@fortawesome/free-solid-svg-icons";
import Image from 'next/image'
import { type } from 'os';
config.autoAddCss = false;

enum MainIconStates {
    Closed,
    Open,
    Nudging,
}

enum Tabs {
    Styling,
    BrandInfo,
}

type Voice = {
    voice: String;
    isSelected: boolean;
}

export default function GlobalBrandingIcon() {
    const [mainIconState, setMainIconState] = useState(MainIconStates.Closed);

    function getStateClassName() {
        if (mainIconState == 0) return "closed";
        else if (mainIconState == 1) return "open";
        else return "nudging";
    }
    useEffect(() => {
        setTimeout(() => {
            NudgeUser()
        }, 5000);
    }, []);

    function NudgeUser() {

        setMainIconState(a => a === MainIconStates.Closed ? MainIconStates.Nudging : a);

        setTimeout(() => {
            setMainIconState(a => a === MainIconStates.Nudging ? MainIconStates.Closed : a);

        }, 5000);
    }



    function getMainIconChildComponent() {
        if (mainIconState == 0) {
            return <ClosedMainIconBody />;
        } else if (mainIconState == 1) {

            return < OpenMainIconBody setMainIconState={setMainIconState} />;
        }
        else return <div className='nudge_text'>Get upto 60% better results by providing more details about your brand 😲</div>;
    }


    return (
        // <div className={"test ${voice.isSelected ? 'selected' : ''}"}>
        <div className={`test`} style={{ height: mainIconState === MainIconStates.Open ? '100vh' : '0', width: mainIconState === MainIconStates.Open ? '100vw' : '0', borderRadius: mainIconState === MainIconStates.Open ? '0' : '' }}>
            <div onClick={() => { setMainIconState(a => a !== MainIconStates.Open && (a === MainIconStates.Closed || a === MainIconStates.Nudging) ? MainIconStates.Open : a) }} className={"main_icon " + getStateClassName()} >
                {getMainIconChildComponent()}
            </div>
        </div >
    );
}

function ClosedMainIconBody() {

    return (<FontAwesomeIcon icon={faInfo} size='2x' color='#1B651E' />);
}

interface ChildProps {
    setMainIconState: (iconState: MainIconStates) => void;
}

function OpenMainIconBody(props: ChildProps) {
    const { setMainIconState } = props;
    const [activeTab, setActveTab] = useState(Tabs.Styling);


    return (<>
        <div className="header">
            <div className="top_row">
                <h2>Set up your brand</h2>
                <button onClick={(e) => { e.stopPropagation(); setMainIconState(MainIconStates.Closed) }} type="button">
                    <FontAwesomeIcon icon={faX}
                    /></button>
            </div>
            <div className="tab_row">
                <div onClick={() => { setActveTab(Tabs.Styling); }} className={"tab_button " + (activeTab === Tabs.Styling ? "tab_active" : "")}>Styling</div>
                <div onClick={() => { setActveTab(Tabs.BrandInfo); }} className={"tab_button " + (activeTab === Tabs.BrandInfo ? "tab_active" : "")}>Brand information</div>
            </div>
        </div>
        <div className="body">{activeTab === Tabs.Styling ? <StylingTab /> : <BrandInfoTab />}</div>
    </>)
}

function StylingTab() {
    const [colorToggles, setColorToggles] = useState([false, false, false]);



    return (
        <div className='styling_tab_main'>
            <div>
                <p className="label_text">Do you have a website for your brand? If yes, enter below</p>
                <input type="text" name="website" id="website" className="text_input" placeholder='eg. https://kendal.ai' />
            </div>
            <div>
                <p className="label_text">Upload all your logo files</p>
                <div className="upload_placeholder">
                    <Image className='file_upload' src="/system-uicons_file-upload.png" width={84}
                        height={84} alt='file_upload'></Image>
                    <h3>
                        Upload the different types of logo files your have
                    </h3>
                    <p>
                        These could be atmost 5 files including logomarks, logotypes, dark and light variants in SVG, PNG or JPEG formats.
                    </p>
                    <button type="button">Browse from device</button>

                </div>
            </div>
            <p className="label_text">Add atleast 3 of your brand colours</p>
            <div className='color_buttons_row'>
                <div onClick={() => { setColorToggles(a => [!a[0], a[1], a[2]]) }} className="color_buttons" style={{ backgroundColor: colorToggles[0] === true ? '#9751F2' : '' }}>
                    <FontAwesomeIcon icon={faPlus} color='#ffffff30' size='2x' />
                    <p>{colorToggles[0] === true ? '#9751F2' : 'Primary'}</p>
                </div>
                <div onClick={() => { setColorToggles(a => [a[0], !a[1], a[2]]) }} className="color_buttons" style={{ backgroundColor: colorToggles[1] === true ? '#F35933' : '' }}>
                    <FontAwesomeIcon icon={faPlus} color='#ffffff30' size='2x' />
                    <p>{colorToggles[1] === true ? '#F35933' : 'Secondary'}</p>
                </div>
                <div onClick={() => { setColorToggles(a => [a[0], a[1], !a[2]]) }} className="color_buttons" style={{ backgroundColor: colorToggles[2] === true ? '#51B8F2' : '' }}>
                    <FontAwesomeIcon icon={faPlus} color='#ffffff48' size='2x' />
                    <p>{colorToggles[2] === true ? '#51B8F2' : 'Tertiary'}</p>
                </div>
            </div>
            <div className='footer'>

                <button type="button" >Save changes</button>
            </div>
        </div>
    );
}

function BrandInfoTab() {

    const initialVoiceData = [
        "Professional",
        "Humorous",
        "Friendly",
        "Quirky",
        "Sophisticated",
        "Bold",
        "Trustworthy",
        "Informal",
        "Straightforward",
        "Passionate",
        "Casual",
        "Enthusiastic",
        "Innovative",
        "Ironic",
        "Educational",
        "Empowering",
        "Relaxed",
        "Unhinged",
        "Inspirational",
        "Formal",
        "Upbeat",
        "Gen Z",
    ];

    const initialVoices = initialVoiceData.map((voiceName) => ({
        voice: voiceName,
        isSelected: false,
    }));

    const [voices, setVoices] = useState<Voice[]>(initialVoices);

    function toggleChuckleSelection(index: number) {
        setVoices((prevVoices) => {
            const updatedVoices = [...prevVoices];
            updatedVoices[index] = {
                ...updatedVoices[index],
                isSelected: !updatedVoices[index].isSelected,
            };
            return updatedVoices;
        });
    }


    return (
        <div className='styling_tab_main'>
            <div>
                <p className="label_text">What industry does your brand fall under?</p>
                <input type="text" name="website" id="website" className="text_input" placeholder='eg. Athleisure' />
            </div>
            <div>
                <p className="label_text">Tell us about your brand or business? Be as detailed as possible.</p>
                <textarea name="website" id="website" className="text_input about_brand" placeholder='Write about what does your brand do, what is your primary audience, what products or services do you offer, etc.' />
            </div>

            <p className="label_text">How would you describe your brand’s voice? (Select max 5 options)</p>
            <div className='chicklets_flex'>
                {voices.map((voice, index) => (
                    <div
                        onClick={() => toggleChuckleSelection(index)}
                        key={index}
                        className={`chicklet ${voice.isSelected ? 'selected' : ''}`}
                    >
                        {voice.voice}
                    </div>
                ))}
            </div>
            <div className='footer'>

                <button type="button" >Save changes</button>
            </div>
        </div>
    );
}


