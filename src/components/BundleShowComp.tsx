import { Space, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "../common.scss";
import "../pages/BundleItemPage.scss";
import { useEffect, useRef, useState } from "react";
import { firestore } from "../firebase";
import { collection, DocumentData, getDocs, query } from "firebase/firestore";
import { bundleViewType } from "../types/types";
export default function BundleShowComp() {
  const [bundleButton, setBundleButton] = useState<number>(1);
  const [dataSwitch, setDataSwitch] = useState<boolean>();
  const [springBundleArray, setSpringBundleArray] = useState<bundleViewType[]>(
    []
  );
  const [summerBundleArray, setSummerBundleArray] = useState<bundleViewType[]>(
    []
  );
  const [fallBundleArray, setFallBundleArray] = useState<bundleViewType[]>([]);
  const [winterBundleArray, setWinterBundleArray] = useState<bundleViewType[]>(
    []
  );
  const [specialBundleArray, setSpecialBundleArray] = useState<
    bundleViewType[]
  >([]);
  const [springHarvest, setSpringHarvest] = useState<bundleViewType[]>([]);
  const [summerHarvest, setSummerHarvest] = useState<bundleViewType[]>([]);
  const [fallHarvest, setFallHarvest] = useState<bundleViewType[]>([]);
  const [qualityHarvest, setQualityHarvest] = useState<bundleViewType[]>([]);
  const [masterHarvest, setMasterHarvest] = useState<bundleViewType[]>([]);
  const [riverFish, setRiverFish] = useState<bundleViewType[]>([]);
  const [lakeFish, setLakeFish] = useState<bundleViewType[]>([]);
  const [oceanFish, setOceanFish] = useState<bundleViewType[]>([]);
  const [nightFish, setNightFish] = useState<bundleViewType[]>([]);
  const [crabPot, setCrabPot] = useState<bundleViewType[]>([]);
  const [specialtyFish, setSpecialtyFish] = useState<bundleViewType[]>([]);
  const [blacksmith, setBlacksmith] = useState<bundleViewType[]>([]);
  const [geologist, setGeologist] = useState<bundleViewType[]>([]);
  const [adventurer, setAdventurer] = useState<bundleViewType[]>([]);
  const [chef, setChef] = useState<bundleViewType[]>([]);
  const [dye, setDye] = useState<bundleViewType[]>([]);
  const [fieldResearch, setFieldResearch] = useState<bundleViewType[]>([]);
  const [fodder, setFodder] = useState<bundleViewType[]>([]);
  const [enchanter, setEnchanter] = useState<bundleViewType[]>([]);
  const [safe2500, setSafe2500] = useState<bundleViewType[]>([]);
  const [safe5000, setSafe5000] = useState<bundleViewType[]>([]);
  const [safe10000, setSafe10000] = useState<bundleViewType[]>([]);
  const [safe25000, setSafe25000] = useState<bundleViewType[]>([]);
  const [joja, setJoja] = useState<bundleViewType[]>([]);

  const bundleRef1 = useRef<HTMLLIElement>(null);
  const bundleRef2 = useRef<HTMLLIElement>(null);
  const bundleRef3 = useRef<HTMLLIElement>(null);
  const bundleRef4 = useRef<HTMLLIElement>(null);
  const bundleRef5 = useRef<HTMLLIElement>(null);
  const bundleRef6 = useRef<HTMLLIElement>(null);
  const bundleRef7 = useRef<HTMLLIElement>(null);
  const listtRef = useRef<HTMLDivElement>(null);
  const CraftRoom = useRef<HTMLDivElement>(null);
  const Pantry = useRef<HTMLDivElement>(null);
  const Fishbowl = useRef<HTMLDivElement>(null);
  const BoilerRoom = useRef<HTMLDivElement>(null);
  const NoticeBoard = useRef<HTMLDivElement>(null);
  const Safe = useRef<HTMLDivElement>(null);
  const JojaMart = useRef<HTMLDivElement>(null);

  useEffect(() => {
    collectBundle();
    harvestBundle();
    fishBundle();
    mineralBundle();
    cookBundle();
    etcBundle();
  }, []);
  useEffect(() => {
    resetBundle();
    switch (bundleButton) {
      case 1: {
        bundleRef1.current!.style.fontWeight = "700";
        bundleRef1.current!.style.border = "1px solid #FF8989";
        listtRef.current!.style.backgroundColor = "#FFE4E4";
        listtRef.current!.style.border = "1px solid #FF8989";
        CraftRoom.current!.style.display = "block";
        break;
      }
      case 2: {
        bundleRef2.current!.style.fontWeight = "700";
        bundleRef2.current!.style.border = "1px solid #E6AB5E";
        listtRef.current!.style.backgroundColor = "#FFF2E4";
        listtRef.current!.style.border = "1px solid #E6AB5E";
        Pantry.current!.style.display = "block";

        break;
      }
      case 3: {
        bundleRef3.current!.style.fontWeight = "700";
        bundleRef3.current!.style.border = "1px solid #E6D85E";
        listtRef.current!.style.backgroundColor = "#FDFFE4";
        listtRef.current!.style.border = "1px solid #E6D85E";
        Fishbowl.current!.style.display = "block";

        break;
      }
      case 4: {
        bundleRef4.current!.style.fontWeight = "700";
        bundleRef4.current!.style.border = "1px solid #5EE68B";
        listtRef.current!.style.backgroundColor = "#BEFFAE";
        listtRef.current!.style.border = "1px solid #5EE68B";
        BoilerRoom.current!.style.display = "block";

        break;
      }
      case 5: {
        bundleRef5.current!.style.fontWeight = "700";
        bundleRef5.current!.style.border = "1px solid #5ED3E6";
        listtRef.current!.style.backgroundColor = "#E4FEFF";
        listtRef.current!.style.border = "1px solid #5ED3E6";
        NoticeBoard.current!.style.display = "block";

        break;
      }
      case 6: {
        bundleRef6.current!.style.fontWeight = "700";
        bundleRef6.current!.style.border = "1px solid #5E90E6";
        listtRef.current!.style.backgroundColor = "#A2C5FF";
        listtRef.current!.style.border = "1px solid #5E90E6";
        Safe.current!.style.display = "block";

        break;
      }
      case 7: {
        bundleRef7.current!.style.fontWeight = "700";
        bundleRef7.current!.style.border = "1px solid #A55EE6";
        listtRef.current!.style.backgroundColor = "#DDA2FF";
        listtRef.current!.style.border = "1px solid #A55EE6";
        JojaMart.current!.style.display = "block";

        break;
      }

      default:
        break;
    }
  }, [bundleButton]);

  useEffect(() => {
    if (dataSwitch === true) {
    }
  }, [dataSwitch]);
  return (
    <section className="page_wrap">
      <div className="inner">
        <ul className="list_title">
          <li
            ref={bundleRef1}
            onClick={() => {
              changeBundle(1);
            }}
          >
            ?????????
          </li>
          <li
            ref={bundleRef2}
            onClick={() => {
              changeBundle(2);
            }}
          >
            ????????? ?????????
          </li>
          <li
            ref={bundleRef3}
            onClick={() => {
              changeBundle(3);
            }}
          >
            ??????
          </li>
          <li
            ref={bundleRef4}
            onClick={() => {
              changeBundle(4);
            }}
          >
            ????????????
          </li>
          <li
            ref={bundleRef5}
            onClick={() => {
              changeBundle(5);
            }}
          >
            ?????????
          </li>
          <li
            ref={bundleRef6}
            onClick={() => {
              changeBundle(6);
            }}
          >
            ??????
          </li>
          <li
            ref={bundleRef7}
            onClick={() => {
              changeBundle(7);
            }}
          >
            ????????????
          </li>
        </ul>
        <div ref={listtRef} className="list_wrap">
          <div ref={CraftRoom}>
            {bundleViewer(
              "??? ?????? ?????????",
              springBundleArray,
              "??? ?????? ?????? 30"
            )}
            {bundleViewer(
              "?????? ?????? ?????????",
              summerBundleArray,
              "?????? ?????? ?????? 30"
            )}
            {bundleViewer(
              "?????? ?????? ?????????",
              fallBundleArray,
              "?????? ?????? ?????? 30"
            )}
            {bundleViewer(
              "?????? ?????? ?????????",
              winterBundleArray,
              "?????? ?????? ?????? 30"
            )}
            {bundleViewer(
              "?????? ?????? ?????????",
              specialBundleArray,
              "????????? ?????? 5",

              5
            )}
          </div>
          <div ref={Pantry}>
            {bundleViewer("??? ?????? ?????????", springHarvest, "??????????????? 20")}
            {bundleViewer(
              "?????? ?????? ?????????",
              summerHarvest,
              "????????????????????? 20"
            )}
            {bundleViewer("?????? ?????? ?????????", fallHarvest, "?????????")}
            {bundleViewer("?????? ?????? ?????????", qualityHarvest, "?????????")}
            {bundleViewer("?????? ?????????", masterHarvest, "??????", 6)}
          </div>
          <div ref={Fishbowl}>
            {bundleViewer("??? ????????? ?????????", riverFish, "?????? 30")}
            {bundleViewer("?????? ????????? ?????????", lakeFish, "????????? ????????? ??????")}
            {bundleViewer("?????? ????????? ?????????", oceanFish, "?????? ??????: ?????? 5")}
            {bundleViewer("??? ????????? ?????????", nightFish, "????????? ??????")}
            {bundleViewer("????????? ?????? ?????????", crabPot, "????????? ?????? 3")}
            {bundleViewer("?????? ????????? ?????????", specialtyFish, "????????? ?????? 5")}
          </div>
          <div ref={BoilerRoom}>
            {bundleViewer("???????????? ?????????", blacksmith, "?????????")}
            {bundleViewer("???????????? ?????????", geologist, "??? ?????????")}
            {bundleViewer("????????? ?????????", adventurer, "???????????? ??????")}
          </div>
          <div ref={NoticeBoard}>
            {bundleViewer("????????? ?????????", chef, "?????? ????????? 3")}
            {bundleViewer("?????? ?????????", dye, "?????? ?????????")}
            {bundleViewer("?????? ????????? ?????????", fieldResearch, "????????? ??????")}
            {bundleViewer("?????? ?????????", fodder, "??????")}
            {bundleViewer("????????? ?????????", enchanter, "??? ?????? 5")}
          </div>
          <div ref={Safe}>
            {bundleViewer("2500 ?????????", safe2500, "????????? ????????? 3")}
            {bundleViewer("5000 ?????????", safe5000, "?????? ?????? 30")}
            {bundleViewer("10000 ?????????", safe10000, "?????????")}
            {bundleViewer("25000 ?????????", safe25000, "???????????????")}
          </div>
          <div ref={JojaMart}>
            {bundleViewer("???????????? ?????????", joja, "?????????")}
          </div>
        </div>
      </div>
    </section>
  );
  function changeBundle(num: number) {
    setBundleButton(num);
  }
  function resetBundle() {
    bundleRef1.current!.style.fontWeight = "400";
    bundleRef1.current!.style.border = "1px solid #b2b2b2";
    bundleRef2.current!.style.fontWeight = "400";
    bundleRef2.current!.style.border = "1px solid #b2b2b2";
    bundleRef3.current!.style.fontWeight = "400";
    bundleRef3.current!.style.border = "1px solid #b2b2b2";
    bundleRef4.current!.style.fontWeight = "400";
    bundleRef4.current!.style.border = "1px solid #b2b2b2";
    bundleRef5.current!.style.fontWeight = "400";
    bundleRef5.current!.style.border = "1px solid #b2b2b2";
    bundleRef6.current!.style.fontWeight = "400";
    bundleRef6.current!.style.border = "1px solid #b2b2b2";
    bundleRef7.current!.style.fontWeight = "400";
    bundleRef7.current!.style.border = "1px solid #b2b2b2";
    CraftRoom.current!.style.display = "none";
    Pantry.current!.style.display = "none";
    BoilerRoom.current!.style.display = "none";
    Fishbowl.current!.style.display = "none";
    NoticeBoard.current!.style.display = "none";
    Safe.current!.style.display = "none";
    JojaMart.current!.style.display = "none";
  }
  function collectBundle() {
    const Plant = "images/Plant/";
    const q = query(
      firestore.collection("Resource/Object/Plant")
      // .where("purpose", "array-contains", "??? ?????? ?????????")
    );
    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let data: DocumentData = doc.data();
        let pushdata: bundleViewType = {
          name: data.name,
          portrait: Plant + data.portrait,
          explain: data.explain,
        };
        if (data.purpose.includes("??? ?????? ?????????")) {
          setSpringBundleArray((bundle) => [...bundle, pushdata]);
        } else if (data.purpose.includes("?????? ?????? ?????????")) {
          setSummerBundleArray((bundle) => [...bundle, pushdata]);
        } else if (data.purpose.includes("?????? ?????? ?????????")) {
          setFallBundleArray((bundle) => [...bundle, pushdata]);
        } else if (data.purpose.includes("?????? ?????? ?????????")) {
          setWinterBundleArray((bundle) => [...bundle, pushdata]);
        } else if (data.purpose.includes("?????? ?????? ?????????")) {
          setSpecialBundleArray((bundle) => [...bundle, pushdata]);
        }
        if (data.purpose.includes("?????? ?????????")) {
          setMasterHarvest((bundle) => [...bundle, pushdata]);
        }
        if (data.purpose.includes("????????? ?????????")) {
          setChef((bundle) => [...bundle, pushdata]);
        }
        if (data.purpose.includes("?????? ?????????")) {
          setDye((bundle) => [...bundle, pushdata]);
        }
        if (data.purpose.includes("?????? ?????? ?????????")) {
          setFieldResearch((bundle) => [...bundle, pushdata]);
        }
        if (data.purpose.includes("?????? ?????????")) {
          setFodder((bundle) => [...bundle, pushdata]);
        }
        if (data.purpose.includes("????????? ?????????")) {
          setEnchanter((bundle) => [...bundle, pushdata]);
        }
        if (data.purpose.includes("???????????? ?????????")) {
          setJoja((bundle) => [...bundle, pushdata]);
        }
      });
      setDataSwitch(true);
    });
  }
  function harvestBundle() {
    const Harvest = "images/Harvest/";
    const Product = "images/Product/";
    const q = query(firestore.collection("Resource/Object/Harvest"));
    const q2 = query(firestore.collection("Resource/Object/Product"));
    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let data: DocumentData = doc.data();
        let pushdata: bundleViewType = {
          name: data.name,
          portrait: Harvest + data.portrait,
          explain: data.explain,
        };
        if (data.purpose.includes("??? ?????? ?????????")) {
          setSpringHarvest((bundle) => [...bundle, pushdata]);
        } else if (data.purpose.includes("?????? ?????? ?????????")) {
          setSummerHarvest((bundle) => [...bundle, pushdata]);
        } else if (data.purpose.includes("?????? ?????? ?????????")) {
          setFallHarvest((bundle) => [...bundle, pushdata]);
        }
        if (data.purpose.includes("?????? ?????? ?????????")) {
          setQualityHarvest((bundle) => [...bundle, pushdata]);
        }
        if (data.purpose.includes("????????? ?????????")) {
          setChef((bundle) => [...bundle, pushdata]);
        }
        if (data.purpose.includes("?????? ?????????")) {
          setDye((bundle) => [...bundle, pushdata]);
        }
        if (data.purpose.includes("?????? ?????? ?????????")) {
          setFieldResearch((bundle) => [...bundle, pushdata]);
        }
        if (data.purpose.includes("?????? ?????????")) {
          setFodder((bundle) => [...bundle, pushdata]);
        }
        if (data.purpose.includes("????????? ?????????")) {
          setEnchanter((bundle) => [...bundle, pushdata]);
        }
        if (data.purpose.includes("???????????? ?????????")) {
          setJoja((bundle) => [...bundle, pushdata]);
        }
      });
      setDataSwitch(true);
    });
    getDocs(q2).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let data: DocumentData = doc.data();
        let pushdata: bundleViewType = {
          name: data.name,
          portrait: Product + data.portrait,
          explain: data.explain,
        };
        if (data.purpose.includes("?????? ?????????")) {
          setMasterHarvest((bundle) => [...bundle, pushdata]);
        }
        if (data.purpose.includes("????????? ?????????")) {
          setChef((bundle) => [...bundle, pushdata]);
        }
        if (data.purpose.includes("?????? ?????????")) {
          setDye((bundle) => [...bundle, pushdata]);
        }
        if (data.purpose.includes("?????? ?????? ?????????")) {
          setFieldResearch((bundle) => [...bundle, pushdata]);
        }
        if (data.purpose.includes("?????? ?????????")) {
          setFodder((bundle) => [...bundle, pushdata]);
        }
        if (data.purpose.includes("????????? ?????????")) {
          setEnchanter((bundle) => [...bundle, pushdata]);
        }
        if (data.purpose.includes("???????????? ?????????")) {
          setJoja((bundle) => [...bundle, pushdata]);
        }
      });
      setDataSwitch(true);
    });
  }
  function fishBundle() {
    const Fish = "images/Fish/";
    const q = query(
      firestore.collection("Resource/Object/Fish")
      // .where("purpose", "array-contains", "??? ?????? ?????????")
    );
    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let data: DocumentData = doc.data();
        let pushdata: bundleViewType = {
          name: data.name,
          portrait: Fish + data.portrait,
          explain: data.season + data.location + data.time,
        };
        if (data.purpose.includes("??? ????????? ?????????")) {
          setRiverFish((bundle) => [...bundle, pushdata]);
        } else if (data.purpose.includes("?????? ????????? ?????????")) {
          setLakeFish((bundle) => [...bundle, pushdata]);
        } else if (data.purpose.includes("?????? ????????? ?????????")) {
          setOceanFish((bundle) => [...bundle, pushdata]);
        } else if (data.purpose.includes("??? ????????? ?????????")) {
          setNightFish((bundle) => [...bundle, pushdata]);
        } else if (data.purpose.includes("????????? ?????? ?????????")) {
          setCrabPot((bundle) => [...bundle, pushdata]);
        } else if (data.purpose.includes("?????? ????????? ?????????")) {
          setSpecialtyFish((bundle) => [...bundle, pushdata]);
        }
        if (data.purpose.includes("?????? ?????????")) {
          setDye((bundle) => [...bundle, pushdata]);
        }
        if (data.purpose.includes("?????? ?????? ?????????")) {
          setFieldResearch((bundle) => [...bundle, pushdata]);
        }
        if (data.purpose.includes("?????? ?????????")) {
          setFodder((bundle) => [...bundle, pushdata]);
        }
        if (data.purpose.includes("????????? ?????????")) {
          setEnchanter((bundle) => [...bundle, pushdata]);
        }
        if (data.purpose.includes("???????????? ?????????")) {
          setJoja((bundle) => [...bundle, pushdata]);
        }
      });
      setDataSwitch(true);
    });
  }
  function mineralBundle() {
    const Mineral = "images/Mineral/";
    const q = query(firestore.collection("Resource/Object/Mineral"));
    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let data: DocumentData = doc.data();
        let pushdata: bundleViewType = {
          name: data.name,
          portrait: Mineral + data.portrait,
          explain: data.explain,
        };
        if (data.purpose.includes("???????????? ?????????")) {
          setBlacksmith((bundle) => [...bundle, pushdata]);
        } else if (data.purpose.includes("???????????? ?????????")) {
          setGeologist((bundle) => [...bundle, pushdata]);
        } else if (data.purpose.includes("????????? ?????????")) {
          setAdventurer((bundle) => [...bundle, pushdata]);
        }
        if (data.purpose.includes("?????? ?????????")) {
          setDye((bundle) => [...bundle, pushdata]);
        }
        if (data.purpose.includes("?????? ?????? ?????????")) {
          setFieldResearch((bundle) => [...bundle, pushdata]);
        }
        if (data.purpose.includes("?????? ?????????")) {
          setFodder((bundle) => [...bundle, pushdata]);
        }
        if (data.purpose.includes("????????? ?????????")) {
          setEnchanter((bundle) => [...bundle, pushdata]);
        }
        if (data.purpose.includes("???????????? ?????????")) {
          setJoja((bundle) => [...bundle, pushdata]);
        }
      });
      setDataSwitch(true);
    });
  }
  function etcBundle() {
    const Etc = "images/Etc/";
    const q = query(firestore.collection("Resource/Object/Etc"));
    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let data: DocumentData = doc.data();
        let pushdata: bundleViewType = {
          name: data.name,
          portrait: Etc + data.portrait,
          explain: data.explain,
        };
        if (data.purpose.includes("2500 ?????????")) {
          setSafe2500((bundle) => [...bundle, pushdata]);
        } else if (data.purpose.includes("5000 ?????????")) {
          setSafe5000((bundle) => [...bundle, pushdata]);
        } else if (data.purpose.includes("10000 ?????????")) {
          setSafe10000((bundle) => [...bundle, pushdata]);
        } else if (data.purpose.includes("25000 ?????????")) {
          setSafe25000((bundle) => [...bundle, pushdata]);
        }
      });
      setDataSwitch(true);
    });
  }
  function cookBundle() {
    const Food = "images/Food/";
    const q = query(firestore.collection("Resource/Object/Food"));
    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let data: DocumentData = doc.data();
        let pushdata: bundleViewType = {
          name: data.name,
          portrait: Food + data.portrait,
          explain: data.explain,
        };
        if (data.purpose.includes("????????? ?????????")) {
          setChef((bundle) => [...bundle, pushdata]);
        }
      });
      setDataSwitch(true);
    });
  }
  function bundleViewer(
    bundleTitle: string,
    bundleName: bundleViewType[],
    bundleReward: string,
    bundleNum: number = bundleName.length
  ) {
    return (
      <div className="content_wrap">
        <div>{bundleTitle}</div>
        <div className="slot_wrap">{forBtnSlot(bundleNum)}</div>
        <div className="table_wrap">
          <div className="table_title">
            <h4>??????</h4>
            <h4>?????????</h4>
          </div>
          <ul className="table_content_list">
            {bundleName.map((item) => {
              return (
                <li key={item.portrait}>
                  <img className="item_img" src={item.portrait} alt="" />
                  <p className="item_name">{item.name}</p>
                  <p className="item_obtain">{item.explain}</p>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="reward_wrap">
          <p>??????</p>
          <div>img {bundleReward}</div>
        </div>
      </div>
    );
  }
  function forBtnSlot(num: number) {
    let arr = [];
    {
      for (let index = 0; index < num; index++) {
        arr.push(<div className="btn_slot" />);
      }
    }
    return arr;
  }
}
