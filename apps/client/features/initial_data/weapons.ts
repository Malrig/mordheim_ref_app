import { ItemType, RestrictionType, WeaponType } from "../../features/datastore/enums";
import { SpecialRule, Weapon } from "./data_interfaces/items";
import { SourceStatus } from "./data_interfaces/metadata";

const usable_ids = [
  "pBqUzYoyUrnrU--tFfWJ1",
  "UvDP50xEHTPF7poSeyn4m",
  "Oopsu7hYQP1Iyi3EkbCyG",
  "kLe7uyHH01eYjvK3uHYn-",
  "Pwx6mNmWJ1Xd8uRItiUJg",
  "Y0yUbGNGPMacn87zW1isC",
  "ksD2MBQTMOI9Y7lgu0jMg",
  "jYD78otg3GdGvpm5GoLd3",
  "FN2Tt5riB4o5vyZygl_7H",
  "pUNfzD7HfJNccaKNkfQrf",
  "Eo2dgmSN9gmxWDcCvC-BR",
  "7jKuGrQj_GBHS0Q2amVfy",
  "cxxqw1OARwSZx9kdXF2oE",
  "hyWsz1f59B1AybDv8xLc5",
  "kTp2bbXliTyeQ_Ga48dbw",
  "o97JNS69THKDUkY5CERgs",
  "rhNXqgb37x_A0NYYrfnFV",
  "eHHXwP4x9IJC13lr_pHvC",
  "KUG1aolRFfVYsZOlKqxVs",
  "Oh7ViTAz_kgeu_lEEr4s3",
  "NCEsYfs1Pi5OT1h3Xmm_7",
  "tLCS55Jpt38kxGpmx3ceB",
  "xDywPoh1F5y0YkkJvJdx0",
  "hjw70sLIjZIT0HNTL6kyF",
  "Axb-G7E5g-bEqeZtmqFFg",
  "ENB88GUaj5KDyPYWF5_sL",
  "NvuKDHsZRZFyAcH9ONSjL",
  "53El1ptB-1_iJtK0r93Bp",
  "YWCTwFZTgeqBgKfbbk5mv",
  "xGusdAapiVrcJPBzusy8n",
  "_JK9aZRzseNvE8MWtT_p1",
  "kH5zvE5EyynXxKfbgx0xa",
  "ufIOd53mcZzcBlkGppWXh",
  "o0sE3Aa4s94IjAnQ78EW3",
  "2RVg_VIU1a3geC_mvCClA",
  "jG_18W4CPOX3rMI7iNYUR",
  "avZHqZPjYNIPWpzuW8Ywf",
  "e-QB71Yvt20Xt9Qg6eMdQ",
  "OMk96Fd4erL_KGMswMRYb",
  "dBr3k8FSC0a__S965IEoZ",
  "BJ2usP8s5eaNYGgj-LM3X",
  "-kjfdCWQlemF9DPVZH7-j",
  "DGcNIW844eKxfU2hmElUd",
  "GeDmL-oA8RdtfQJtuoEUG",
  "sRmQPR-eTDQZoUVNIwrMT",
  "yvjDmGCpfU_XYdJ44ZucF",
  "To1S0CSYHC2kmCBRn_7Od",
  "ZMytD1k1eOAKH-htI-TUU",
  "xc-3ESl4lG3MA9EvthjCD",
  "PNjCY8egbh9qj3BkMkC5P",
  "uHL9UmPPQPmyCmO8bsgXy",
  "ylfgk240rcDWNELZnGhZ7",
  "uu_8I-x27fQBNRuP9ahFc",
  "sGC4NGbUmEcAufVkmZfXb",
  "Zc5GzB3zFW6vIJBh_Y4z8",
  "T3CPRwKVTDiLOaA4eH-1f",
  "rwPdGPunxP_K-Z-UoJBUW",
  "Vlwb6n4czbVK_v7aQZpsh",
  "UOXEhauhA_XkQEn5VJcYU",
  "SfCOVYnNm9WMeN-egfSM4",
  "nE6ho_OnMfFdn3d1LjVwK",
  "kT5EXGLqdP7aZWyXWEHN3",
  "QaOGVaaG2fmQ5u-yNGd0z",
  "zuc9WHEHQF5da09bZoa7R",
  "cdpKalmi0CxAoSrryZF3x",
  "vAukHz6-s1efS2vx1wo_W",
  "p6SuHazKiz77srlsb5kzp",
  "GSbZdseatVzzVahQiT8Hb",
  "RJW7nFugZt5pvL_-g6ZQb",
  "VUGWLfrI1zj_jLi462MGy",
  "4fd_b6pmpTIqquzTeYrSa",
  "eM6E4kEYTlbvyeGuYKeDW",
  "012Wd-upB_2vw82S2sPwu",
  "RF7D75SLWDhEuxY86MAw2",
  "-II7hJLmxzN79xakHOusu",
  "QCvypAOZWAIajBU-WRDpE",
  "_Dulw95EGO7fZGP4D_rgY",
  "bum--7y54_WCbnF-WrFI3",
  "poyFtdeaNTxHQk5Gy4HQw",
  "NLuysdddTHnptJyy3BeE2",
  "cIKpPZmGaGEHNKwCl7FAo",
  "VA4pRKI30A4pNyA1jtimG",
  "7thqtZkiZGt6CHlu_WtDg",
  "0vl551_onm73JjUAef7t0",
  "VufC_-eUDVQBL8uBXf9vc",
  "vLUj6oNoi4Bdm8zcGYADg",
  "zDkjm_Tn5iNYvzjVfJVtJ",
  "XD2nSNqWx0CGwK0l0tAMl",
  "njW66aE2RDYsY9ibbH3Ar",
  "xncmsEt-P4XFBa_2pXeNW",
  "kW1OLA4syFweDCaz5F4Tg",
  "R7NtBZ--_LZlKI9NvJgJf",
  "kqZIbLURLPP1JHRruMt-P",
  "8DtBmNVGqA7aoPuZGV_j5",
  "9ZKJ6axVYdyLXwZB_vPD7",
  "L3OwtwHEtNiQnlG3YEPWs",
  "twxnAienMisW_rlZBTzs-",
  "popOb99UbHmpql3o7_jsf",
  "MeeLJGSzKEN7QzM7MlgYE",
  "CfTdVEylsO_NRucttNQqm",
  "ivDya9ZNseiSHEp8h8ZD_",
  "nBQ92OjVS8LkIGr7xpF8s",
  "5puRb5ixnrm-FvAhViwZd",
  "g3GYNPzmMwxu0VcaBD_Pr",
  "WkHa1kWhYQVwzmD1zfstF",
  "wUssjD6lX1NwVUtOxP21O",
  "k2vO2pE3qJbGdPS8KhMFa",
  "RNwNAiFrvgHTTC4ExGcbV",
  "FFAxfUW6JLS3EMiHtPDZq",
  "CYdIg0R-ejAKJNjK-jSNo",
  "XJwG3J60DlAQV8Z1H1YOh",
  "MmC04VLqRqDv4PxRZhhX8",
  "tyJEG8yN2VSdZvpL5eoOW",
  "_zEz_XqYwveti4xVt7AML",
  "kSOybECvrQXLAju8a3IAX",
  "zLMDH6Jae1lF7RqwijrzK",
  "XjKpdbaF39e8sOCiPzqWs",
  "bLdHlFaheaALKBmT2_zW9",
  "50D2aOcTPTLSwHtAr7pLF",
  "Lclv8Bb8ki5knAgqJqRiP",
  "vOaFx28nhFjtpsl1qCG3T",
  "wZWxw0udyMX1TgUrw7BIE",
  "rOfGs8wcZglc9rkukRrEl",
  "PgKk23Xbax_9lPBZBdfs7",
  "qJYLqrCGWJnS68oNbB7uz",
  "fLMzVDuVdqsqD68R7sIiP",
  "EUkd0kKWs3kXGVqDhTiqO",
  "Q-ZeAOHV-fQ805b4WhLZ2",
  "atWqDDLf_AF5JF-WNXNSl",
  "mQXK-O9N005wKMn7vAwiV",
  "PTl2pwxeE4MTpvsjZzKP1",
  "_OttNYEM25U-ak0E8kgjp",
  "Rvgi2j_TszPt5EnOv_MxD",
  "DLfUsXSJmWIlKtxsMt0di",
  "2_Gg0RBK2_bscxZVhDSBw",
  "H3WfoI_5D7Cm5zpyJwQD8",
  "C-KKzMHn838mdf6MeN08d",
  "woFnre1wVJynGF9-EKWlB",
  "zcosjRyDPjf04abMxa0d_",
  "Gq_OxJTrM5F_1SCpzCKbB",
  "z8t96KWzpyl9ZVczHfRmA",
  "bZt7PZKR_SsgLIr7XXKCo",
  "E2FCoUDsq0Y91HSzVLf7w",
  "TYDikEKuTSNhkPCNaxE5L",
  "Da5LxO34AZxJ94FO2YP6a",
  "3iTHUXXoqzc1slFSqkRyp",
  "pbBN_9id2T5S4OdMoJ9dy",
  "FPFqZev6xK3mZFlp0uPsg",
  "R5QOJm50BAQ36qCo3e_Ky",
  "upQlQGwGrLT3DR21xzf6_",
  "1r8qXcmI186OsDt4L4ScQ",
  "eoIu9-r0HQjOrLxhRqsgq",
  "rDKyQmG0JOZ-fqYANoU8S",
  "XqKbApbstIog4z8ts7yuT",
  "MMO-a767jDwojYY34mjQZ",
  "pYSt8pHOXrqHIC7FxmSPq",
  "m9KCvRTPY_d3yGx6LjBHl",
  "JfngqNTYt-JFqaeQ8A9zQ",
  "EG820RJ8Oj8AT7PQvRaRI",
  "p_s4qNHm8fQC8OGBun7-p",
  "urMavpCuFmA2PaSRWXx2C",
  "0hKzRjNmWsZSHMs4jKbxS",
  "ohP5p-uB-yyF2XgHQctDM",
  "bcwFsbYuSiA6XabS0cppu",
  "ami_PHtXHLA_o8EFv4S6B",
  "UF7JiQQHV7AfSp39rDJex",
  "0HFsymfeqECVhPrOQ0o4Q",
  "aWo2ZcVy82fD7h5iyI8mJ",
  "PJsyZu0fh-fYlGdkdEone",
  "QqUF5caM9xLOjZVX2w4wu",
  "UohuWFnLQbIdTMEVNRutt",
  "rO7_WxPrPnAZdYPogzNvt",
  "7x4xy0WuZpT9gNqlbdZiz",
  "FQrS62MsQRJLkl2FSTUJJ",
  "V7j6rl_mLTbLPN0G4TyLB",
  "Cr6I0Z66V15ENdYSctsmu",
  "MkR-WwgpLzBIzzRLAr2ES",
  "KMJ4PaIL2Ct7QpMGSzn-W",
  "UBIwuFu2O43dp2IFMqqN3",
  "zA5UKTi4FuFaYgCLlzz9c",
  "fF20FvAuJtjSiqhmzZExY",
  "xJN4g8S2oC8bueoGfurlN",
  "r1zHmFCNNBupoFxezrHg0",
  "8j6hn0WI47vrpeTv1TJcN",
  "OPMkMoTtZRdGYUbvWbxli",
  "gJZ9strM5alayotiSf5RM",
  "5TQYv945qZpjHS-Rm9TQT",
  "LKQT-xyHwfBQhFSJZFGag",
  "IUdf35BtqI6taLTa4anri",
  "Ke7zojwve528dXWoznMRP",
  "4RMjzFmxV2CIq9hVJKl5M",
  "6pPbmRuhulQZppWhEjLc1",
  "zWbi2jPtH4KSd0hBPv2LP",
  "5RenU8vG_k7EqlpBjI2vV",
  "UYdKxwxwn3o4NAXoUH1LL",
  "Uwjl1TcdFrJeucscMfIA2",
  "wmE4H2Xe5ouT8Og1LkmmC",
  "t0ezZ7O3QRwq-2piGjSkK",
  "n-sh0wZ1Bzhnm93b6_uM-",
  "3OIUKNhHHFIJiId00Rirx",
  "b00ac028-cd2f-4d72-bc",
  "953ce0d9-db37-499f-b6",
  "f1aacc6b-c842-45c0-a7",
  "330cfd87-113f-4dc1-a7",
  "9b839958-9ab6-4466-b8",
  "6de44e55-eff5-4380-81",
  "28614328-9719-4ff0-b5",
  "fbb06593-d13f-4c8f-86",
  "53cf7710-69be-4b70-82",
  "b5860aec-cf95-4d1e-ba",
  "4d2ec958-6c05-4c6e-b9",
  "8e395409-08c0-40bf-84",
  "f239ed73-34ef-4b52-ae",
  "6ded7d56-b562-48df-99",
  "13f8dac0-dfda-48d4-ba",
  "4034f03d-be52-4cbb-ba",
  "2e6bf56d-d44e-4c86-a2",
  "5aa45739-8b8a-4f6c-8e",
  "03e2360a-7135-4c51-a5",
  "9e7061c5-3193-41fa-ad",
  "7d2008c5-dc7c-4fda-9f",
  "5f0ef0d5-26ff-4458-84",
  "d91cc6c6-6a4b-49b3-9e",
  "1e41a7d6-98e2-4a53-80",
  "a602be2f-5162-4c2e-9c",
  "ab8612c2-a866-4bef-af",
  "0e2c9d2f-5ab7-4544-a1",
  "cd9de579-5821-4bbb-91",
  "44a66b4b-9812-4f9a-bb",
  "583b01b6-4500-4136-b1",
  "77017faf-ceab-4262-ba",
  "69cb7aa5-1de9-4f06-a4",
  "412b75b8-c166-4b4c-ae",
  "136629a6-434a-47e0-8d",
  "430266c8-c434-4955-ba",
  "1a1540d2-e219-4113-94",
  "493869dd-f0fc-4813-87",
  "d44bbc8b-3c73-4800-b6",
  "5e72eb30-a04f-4bc4-98",
  "913bbd90-f3dc-44c1-a1",
  "b1696ecf-98ac-4b01-90",
  "861864b1-00aa-43ac-8b",
  "25cdc96d-8854-4da5-b1",
  "b2583d72-a8d8-4de7-a6",
  "7f75b559-338e-4ee7-a6",
  "750ccf2a-659f-4d39-96",
  "824e847e-9138-46c6-9c",
  "70dbe9ea-2807-4798-92",
  "cd23494c-00d9-4fc8-96",
  "6279d40b-1b6f-4797-80",
  "31d19b55-c7fd-4969-93",
  "eee8a08b-dc28-4a16-96",
  "6a8cddd9-8022-4f6c-b7",
  "c4bea478-4430-4f24-b3",
  "96a74e4b-776b-4724-94",
  "0f0723a3-e00c-4836-b8",
  "d7649b95-6d87-48ab-b3",
  "8c0f7892-cafa-49a4-95",
  "4a0c9171-5cc1-4fbe-bf",
  "8951146c-ee8a-428b-93",
  "21db881f-feef-4a51-b2",
  "25ea43e4-08a3-46d5-8d",
  "40070b1c-b9b8-469b-ab",
  "b19ace4e-5831-44f3-a2",
  "ba23c007-8c94-49f4-ab",
  "eab40ba5-e51f-47ee-83",
  "3a5e3359-6407-47ea-8c",
  "738f39db-24b0-437e-a2",
  "e01104e8-d1b1-4d33-b4",
  "c55b9d46-bcd3-49c9-bb",
  "e84da1fe-2dc7-44e9-ab",
  "0f035468-e844-4eda-87",
  "1f1b2883-b76c-4b29-ad",
  "019147fa-a72e-4d40-a2",
  "81f44b51-7399-4e09-a9",
  "95fa22f4-62c6-4f50-b9",
  "caabe97e-37d4-4304-9b",
  "32495b86-3f72-4eb3-af",
  "7c96f6a7-dd5d-44b3-b0",
  "44da363d-f91f-463c-94",
  "5a7ef8a3-ba66-4488-bf",
  "ae753426-5909-45f8-bb",
  "98309391-1313-4dad-b1",
  "0f65dd2d-31ca-46d2-8b",
  "5a6373cd-91b7-49bc-a4",
  "11683e2a-770f-400f-a4",
  "d75f3232-c4eb-480f-8d",
  "d16f5d14-88c8-404d-82",
  "f50318b4-126a-4933-81",
  "3ff5c893-17cc-4cce-a3",
  "28c48712-cff0-49af-a3",
  "be1049ab-158a-462d-ba",
  "34cbb933-ccb3-498d-bd",
  "2f94df6a-54a4-4bc1-87",
  "5c377b65-e2c4-4d54-bf",
  "65a08e1c-eeb8-4eff-88",
  "863890cd-21ce-4a22-95",
  "11d9e044-8be5-4d62-a5",
  "3318c6b6-a1b8-4a65-96",
  "1d454797-b07a-4120-97",
  "8dd7c81a-567f-4ef6-9a",
  "ac9f94a8-352a-4f00-9e",
  "fb8b3053-67f3-4331-88",
  "d3c20d2f-0347-4dfa-bc",
  "18d8b0ce-4f96-40fd-a3",
  "2fca5844-f7df-45d6-84",
  "a1f3e18b-baf0-4fd8-87",
  "4bb53468-f43d-4b31-97",
  "39975575-ad50-4b1c-83",
  "b5dac748-fed0-42fe-ba",
  "2d51bf92-88c2-4198-bd",
  "5d1dcb44-5992-4451-b7",
  "e56fe103-bbb6-4cab-a4",
  "56bbdb44-169b-4b99-94",
  "07105726-b37b-4eca-b1",
  "ff42e9b4-c321-46ca-93",
  "5a5c25c9-b56d-4c8c-af",
  "06a49e95-9575-48d4-ac",
  "c542bbad-ad99-45b1-95",
  "79c64115-1c5e-4b26-a8",
  "7bfb358c-458a-48d9-b1",
  "20faeaed-ae8d-420e-8f",
  "cc3c2cdf-87a2-4f17-98",
  "a513b970-8c64-4482-89",
  "59b82fbe-ac43-48d2-88",
  "155c4d38-082e-40e2-9f",
  "151d8fe7-7fae-4641-87",
  "3fecaee6-fd8e-4edf-80",
  "78b00b0c-524b-4c30-bc",
  "136d572c-2d48-4171-b3",
  "de7fa08f-6c1f-48f9-bb",
  "aec2f1e0-93d8-4e6b-84",
  "13bcc017-30b6-4bfd-95",
  "ed6c168e-b07b-43b3-8c",
  "89cce71a-aa89-47c1-ba",
  "9c190f9f-7c9b-475c-b2",
  "72ddd5b8-33cf-4cb7-80",
  "3d1842c8-174d-440f-b9",
  "e8fa6203-a848-43b4-99",
  "cba4706d-e7ee-4970-b6",
  "7e92e53b-8abd-42a7-88",
  "ed44ffbf-84e2-44e1-b8",
  "d9397aef-d72f-43b8-b3",
  "03105ab0-9528-4542-8e",
  "72f3b9b1-5763-4f12-a7",
  "ff0a39e0-df1b-4d9c-a0",
  "481958ed-5749-4c33-b2",
  "83f86d9c-ecd2-43d2-84",
  "272ecca3-ae88-4e61-b2",
  "fb3abec1-4730-4093-88",
  "2f7f20d4-a05f-4fd1-8b",
  "87714ba7-bf73-4083-a4",
  "7736f489-da6a-45c1-88",
  "75b70a5c-5b6f-4674-83",
  "c3455349-e449-4dee-a6",
  "d4381cef-1577-4334-b0",
  "86561eb3-89be-455b-91",
  "6ffaa8e2-078c-40c5-82",
  "af21492f-4820-4316-9f",
  "c65adb47-fa46-4cf0-ae",
  "311cf5b4-67b7-4147-a8",
  "e0f19f50-bc0a-4fef-b4",
  "449483a4-a0f9-45cb-9c",
  "0b2897ce-95bb-4446-be",
  "0e1c7b20-08e0-46d4-b3",
  "6967f42f-d187-440d-be",
  "0abdbd43-27b7-46b7-9a",
  "b6cc5eb1-4709-49a2-b5",
  "a57f756d-41ac-40c0-ab",
  "ce70997b-97c4-47e6-a5",
  "c13df450-674e-4187-99",
  "2014cacd-9c78-49c8-bb",
  "11e493f0-6a5b-4aec-86",
  "92b2a964-0829-4024-a6",
  "e58e3d9b-40ac-405c-84",
  "6241782a-48bc-43b0-af",
  "bced4154-0dbd-476b-8f",
  "9a9b64dc-2979-4a1b-97",
  "86e26d24-b200-4fd2-a4",
  "fe2e6fcd-5aa6-40ad-98",
  "a0a91805-ff27-4755-aa",
  "0cfe798a-ba9e-46d4-a5",
  "4099d7fb-17fb-4256-b4",
  "dc6904a9-0c38-4682-9a",
  "71b4c812-2217-4969-a4",
  "f960c53e-cb92-4794-bb",
  "636bd357-a5ee-48eb-a4",
  "83189d5b-cf92-41c3-ad",
  "75fcb1cc-d623-4e34-9e",
  "ff79888e-dc8f-4681-bc",
  "40471344-da68-4b64-83",
  "0a706004-8c1e-4485-9f",
  "a135f242-1c1c-48ab-b7",
  "95024868-992a-4f10-88",
  "4e3e5f35-c8e9-4625-8e",
  "1e628e86-1bba-4701-85",
  "2005abef-e19f-42ae-a1",
  "d8a35081-82b8-47f3-97",
  "e82d0526-d256-4b1c-b6",
  "134c1d5c-cc92-4d48-b5",
  "1d9aa42f-43d2-4cc2-ba",
  "5456883d-2d2c-4418-a8",
  "c40372a9-fbae-46c6-ae",
  "aa50c9e6-ae7f-4fe0-b8",
  "8bee23fc-2d9e-45f1-b6",
  "26e3aa5c-278f-4e6c-a8",
  "63859cc2-8939-43fc-a1",
  "5a94f5af-3405-4103-90",
  "b929415b-5d92-4d63-84",
  "bcdca31d-4a62-46c2-92",
  "130c710e-e47f-4e36-a8",
  "6ce54e0c-ad6a-4d5d-a9",
  "07d2402a-0a5d-4780-b3",
  "1cacdc93-6bc4-48a7-8d",
  "8e481997-0529-4db7-b5",
  "968de73b-7476-4483-b5",
  "27e95748-10c6-4d4d-85",
  "8f6b1e1c-02b8-4e06-8d",
  "c76cafd2-e36f-4858-b5",
  "5a067389-02df-416b-8a",
  "23361ddf-18cf-4f39-a9",
  "b2d90da6-3766-4e1b-b3",
  "e3e5b530-a60e-4394-b5",
  "1abe311b-236f-49c0-aa",
  "96311f9d-7eb1-4bb6-99",
  "87b36686-1475-43e7-bd",
  "686dfc69-26e0-433a-97",
  "de5bb7c0-791b-419b-9d",
  "d0db72e8-64d2-48b4-ab",
  "5741c6da-7ed1-49d8-a2",
  "c9cbe471-7270-4591-9d",
  "5c680c35-6f56-43f7-84",
  "d1350738-f18b-4d2c-91",
  "f3b586ae-c19d-4ae0-92",
  "644afa26-5e8b-4335-9d",
  "54e3d2ae-dc99-4913-8c",
  "a5f42a21-b89d-4dee-a9",
  "26dcc5dc-c540-426f-b0",
  "908bab6d-8e57-440c-87",
  "5ec9ff58-abd5-43a9-90",
  "fcb9d522-1f21-4441-ab",
  "ec2c41d3-a6d0-4f6a-98",
  "779c3855-49d0-44d0-bd",
  "3e3c3a52-e160-4fe9-a0",
  "cd8c29c6-e99d-4dde-82",
  "36da1fc4-f020-48f7-82",
  "088f9f4f-49f7-4dde-b5",
  "c02da65d-ed66-446d-82",
  "2779a537-329a-4188-86",
  "bd5ceb7e-5d76-494c-88",
  "9e9384fa-2e83-4b95-8c",
  "8d2e5e01-4585-4984-9b",
  "f98e05f9-a947-4e23-94",
  "553e6196-008d-4e90-bc",
  "ddab2228-eb30-4bab-80",
  "b065d4bc-e9b8-452a-90",
  "583c7b8a-8c01-4351-b3",
  "4b7d93af-b526-48d1-85",
  "8db75e46-9f1f-4a92-8e",
  "041b4dca-aeb6-4d0c-a7",
  "2d0f4304-57af-4a9f-84",
  "dde59a79-2523-4cd4-97",
  "103c3d95-0ff0-4475-8b",
  "03484784-22c1-4939-ab",
  "5acb5973-e6ba-41f9-b1",
  "e5bf3e72-2ce6-496b-b6",
  "2b5491b1-6d00-4bf8-80",
  "f52e8dfe-9db1-44e5-b9",
  "2e676374-960a-4c63-a1",
  "839a1a65-59fe-4ed4-8c",
  "ba8867ef-4ee5-4266-b7",
  "23bd2370-b3ac-4216-bc",
  "59814089-a18d-4c42-a4",
  "3fb9b300-e61a-4a31-ae",
  "78945f20-97ec-4dad-99",
  "2003e802-11b7-4094-8c",
  "8dad4a48-99b2-40df-a0",
  "259d23cc-f616-4150-ac",
  "ed12fef3-84e0-481d-b3",
  "9237150d-6a57-4f39-92",
  "5a18f551-6f02-4481-a0",
  "1f436b47-e94d-4f26-8e",
  "4e2e0757-a3d0-45de-88",
  "a267ca82-acda-46a5-9c",
  "47d29b45-bdb1-4838-a1",
  "b5cabaed-19a0-4feb-97",
  "e5272782-d79c-4e0a-8c",
  "9b7f672a-f149-40a3-99",
  "c77c0403-9f0e-4e17-a5",
  "67367fb9-4653-4a3b-ad",
  "bba5c2f8-ba08-4447-96",
  "35d5252f-ee19-4f41-ac",
  "5bad10a8-3c60-47f5-80",
  "32e4ab26-bb92-4449-8e",
  "54ad460e-2a91-4873-85",
  "49a92c55-1082-4736-8e",
  "a74d0590-7519-43ff-b0",
  "473a4b12-97f9-4609-89",
  "7cf192ad-83bb-4a18-b2",
  "51a96949-4c7a-4f08-91",
]

let special_rules: SpecialRule[] = [
  {
    name: "Cutting Edge",
    description: "Axe - An axe has an extra save modifier of -1, so a model with Strength 4 using an axe has a -2 save modifier when he hits an opponent in hand-to-hand combat.\nCathayan Longsword - A Cathayan Longsword has an extra save modifier of -1, so a model with Strength 4 using a Cathayan Longsword has a -2 save modifier when he hits an opponent in hand-to-hand combat..\nDwarf Axe - Dwarf axes have an extra save modifier of -1, so a model with Strength 4 using a Dwarf axe has a -2 save modifier when he hits an opponent with the axe in close combat..\nGreat Axe - A Great Axe has an extra save modifier of -1, so a model with Strength 4 using a Great Axe has a -4 save modifier in hand-to-hand combat."
  },
  {
    name: "Beastbane",
    description: "Beastlash - The Beastmaster wielding a Beastlash causes Fear in animals, any animal charged or wishing to charge a Beastmaster with one of these weapons must first take a Fear test as mentioned in the psychology section of the Mordheim rules."
  },
  {
    name: "Reach",
    description: "Beastlash - A Beastlash may attack opponents up to 4\" away (see Sisters of Sigmar Steel whip).\nWar Chain - A model armed with a War Chain my attack enemies up to 4\ away in the hand-to-hand combat phase.\nWhip - A model armed with a Whip my attack enemies up to 4\" away in the hand-to-hand combat phase."
  },
  {
    name: "+1 Enemy Armour Save",
    description: "Belaying Pin - Models using Belaying Pins do not suffer any penalties for range, but still suffer a -1 to hit penalty if they use them after moving that turn. They also do not hit very hard, so strike at User Strength -1 and give the target +1 to his armour save (or a 6+ if they have none), exactly as if the enemy had been hit with a bare fist."
  },
  {
    name: "Two-Handed",
    description: "Boat Hook - Boat Hooks are used in Close Combat. They allow the user to Strike First in the first round of any close combat, no matter which model charged, but require both hands to use. Models using a Boat Hook in combat cannot use any other weapons, or gain benefit from a shield or buckler, while in close combat.\nCenser - A Censer requires two hands to be used and the wielder cannot use a shield, buckler or additional weapon in close combat..\nChain Sticks - Chain Sticks require two hands to use and the wielder cannot use a shield, buckler or additional weapon in close combat..\nDragon Sword - A model armed with a Dragon Sword may not use a shield, buckler or additional weapon in close combat. If the model has a shield, he still gets a +1 bonus to his armour save against shooting..\nGreat Axe - As a Great Axe requires two hands to use, a model using a Great Axe may not use a shield, buckler or additional weapon in close combat. If the model has a shield, he still gets a +1 bonus to his armour save against shooting..\nMaul - A model armed with a Maul may not use a shield, buckler or additional weapon in close combat. If the model has a shield, he still gets a +1 bonus to his armour save against shooting..\nStaffsword - As a Staffsword requires two hands to use, a model using one may not use a shield, buckler or additional weapon in close combat. If the model has a shield, he still gets a +1 bonus to his armour save against shooting..\nWizard's Staff - A model using a Wizard's Staff may not use a shield, buckler or additional weapon in close combat. If the model has a shield, it still receives a +1 bonus to his armour save against shooting attacks.."
  },
  {
    name: "Pair",
    description: "Brass Knuckles - Brass Knuckles are used in pairs and the warrior fighting with them gains an extra attack. He may not use any other weapons or items in his hands while doing this however. He is free to swap his brass knuckles for other weapons and items during the battle but he may not do this if in combat..\nFighting Claws - Fighting Claws are traditionally used in pairs, one in each hand. A warrior armed with Fighting Claws gets an additional attack..\nSpiked Gauntlet - Spiked Gauntlets are used in pairs and the warrior fighting with them gains an extra attack. He may not use any other weapons or items in his hands while doing this however. He is free to swap his Spiked Gauntlets for other weapons and items during the battle but he may not do this if in combat.."
  },
  {
    name: "Cumbersome",
    description: "Brass Knuckles - Brass Knuckles are difficult to use due to the fact that they offer little in the way of range and a warrior must be close up to his opponent before he can strike. For this reason, a warrior using Brass Knuckles suffers a -2 to initiative in close combat.\nFighting Claws - A model armed with Fighting Claws may not use any other weapons in the entire battle.\nSpiked Gauntlet - Spiked Gauntlets are difficult to use due to the fact that they offer little in the way of range and a warrior must be close up to his opponent before he can strike. For this reason, a warrior using Spiked Gauntlets suffers a -2 to initiative in close combat."
  },
  {
    name: "Two-handed",
    description: "Brazier Staff - As a brazier requires two hands to use, a model using a brazier may not use a shield, buckler or additional weapon in close combat. If the model has a shield, he still gets a +1 bonus to his armour save against shooting..\nDouble-Handed Sword, Hammer, Axe, Etc - A model armed with a double-handed weapon may not use a shield, buckler or additional weapon in close combat. If the model is equipped with a shield, he will still get a +1 bonus to his armour save against shooting..\nFlail - As a flail requires two hands to use, a model using a flail may not use a shield, buckler or additional weapon in close combat. If the model has a shield, he still gets a +1 bonus to his armour save against shooting.\nHalberd - A model armed with a halberd may not use a shield, buckler or additional weapon in close combat. If the model has a shield, he still gets a +1 bonus to his armour save against shooting.\nHorseman's Hammer - A model armed with a horseman's hammer may not use a shield, buckler, or additional weapon in close combat. If the model is equipped with a shield, he will still get a +1 bonus to his Armor save against shooting.."
  },
  {
    name: "Fire",
    description: "Brazier Staff - Whenever you score a successful hit with the brazier staff roll a D6. If you roll a 5+ the victim is set on fire. If the warrior survives the attack, they must score a 4+ in the Recovery phase or suffer a Strength 4 hit each turn they are on fire and will be unable to do anything other than move. Other warriors from the same warband may help to put the flames out if they wish. They must move into base-to-base contact and score a 4+in the Recovery phase.\nTufenk  - If you hit roll a D6, on a 4+ your opponent is set on fire. They must roll a D6 each Recovery phase, on a 4+ they extinguish the fire or they immediately suffer a S4 hit and may only move. Friendly models may help in extinguishing the model that is ablaze. They must be in base-to-base contact and need to roll a 4+ on a D6. Against dry targets likeMummies they are Strength 3 and on a 2+ on1D6 the Mummy catches fire."
  },
  {
    name: "Parry",
    description: "Cathayan Longsword - A Cathayan Longsword is perfectly balanced. A warrior armed with a Cathayan Longsword may parry blows.\nCelestial Iron Fan - A model armed with Celestial Iron Fans may parry blows..\nClaw of the Old Ones - User may Parry as per normal rules.\nDragon Sword - Dragon Swords, despite their great size, can be used to parry like a normal sword.\nDwarf Axe - Dwarf axes offer an excellent balance of defence and offense. A model armed with a Dwarf axe may parry blows.\nFighting Claws - A Skaven armed with Fighting Claws may parry blows and can re-roll a failed attempt once, in the same way as a model armed with a sword and buckler..\nKraken-Tooth Sword - The Kraken-Toothed Sword offers an excellent balance of defence and offence. A model armed with this weaponmay parry blows..\nSword Breaker - The sword breaker allows the wielder to parry the attacks of his opponent's in close combat. When your opponent scores a hit, roll a D6. If you can roll greater than the highest 'to hit' of your opponent, you have parried the attack and the blow is wasted..\nTrident - A model equipped with a Trident may parry the first blow in each round of hand-to-hand combat.\nVeteran's Hand - A model equipped with a Veteran's Arm may parry the first blow in each round of hand-to-hand combat..\nWizard's Staff - A warrior armed with a Wizard's Staff may attempt to Parry a blow, just as a sword..\nSword-Pistol - The Sword Pistol grants a Parry in hand-to-hand combat, just like a real sword. This bonus is applied in every turn, not just turns in which it used as a  ̳sword'. It may be used in the same turn as the Dueling Pistol shot."
  },
  {
    name: "Mastercrafted",
    description: "Cathayan Longsword - Attacks made with a Cathayan Longsword give the bearer +1 Initiative and +1 Weapon Skill."
  },
  {
    name: "Iron Fan",
    description: "Celestial Iron Fan - Attacks made with an Iron Fan give the bearer +1 Initiative. If a Hero has the Art of Silent Death skill then it applies to fan attacks as well.."
  },
  {
    name: "Parry Missiles",
    description: "Celestial Iron Fan - A Celestial Iron Fan can be used to parry missiles in addition to Close Combat attacks. For each hit by a missile weapon, the warrior may roll a D6. If the score is greater than the hit score, the warrior has parried the blow, and the attack is disregarded."
  },
  {
    name: "Heavy",
    description: "Censer - The +2 Strength bonus applies only to the first round of hand-to-hand combat..\nFlail - A flail is extremely tiring to use and thus the +2 Strength bonus applies only in the first turn of each hand-to-hand combat..\nMorning Star - The morning star is extremely tiring to use, so its +1 Strength bonus applies only in the first turn of each hand-to-hand combat.\nObsidian Weapon - Obsidian weapons are so heavy that the warrior using them always strikes last, even when charging."
  },
  {
    name: "Fog of Death",
    description: "Censer - A model hit by the Censer must make a Toughness test. Roll a d6. If the result is higher than the Toughness of the model taking the test, he will suffer an automatic wound in addition to the Censer hit. A result of a 6 always inflicts a wound. Also, the model wielding the Censer must take the test and will suffer a wound with a result of 6. Models of Undead or Possessed are immune to the Fog of Death and do not take the test. If the model wielding the Censer also has the fog enhancing warpstone shards, he becomes a difficult target to shoot at, and models targeting him with a missile weapon suffer a -1 penalty to hit."
  },
  {
    name: "Flurry",
    description: "Chain Sticks - A set of Chain Sticks allows its wielder to unleash a furious bludgeoning. A warrior armed with chain sticks gets +2 Attacks. This bonus only applies in the first turn of each Hand-To-Hand combat. Using Chain Sticks otherwise counts as having two hand weapons."
  },
  {
    name: "Cannot be Parried",
    description: "Chained Attack Squig - A squig's master will often use his pet's chain to swing the beast onto his opponents. Such attacks frequently result in the squig's chain wrapping about, delivering the creature to the victim's rear. Attempts to parry such an attack are futile. A model attacked by an attack squig may not make parries with swords or bucklers.\nWar Chain - The War Chain is a flexible weapon and the Pit Fighters use it with great expertise. Attempts to parry its strikes are futile. A model attacked by a War Chain may not make parries with swords or bucklers.."
  },
  {
    name: "Gnawing bite",
    description: "Chained Attack Squig - An attack squig may only be used to make one attack per round. All other attacks must come from another weapon. However, should an attack from a squig make a successful hit, the little monster will remain attached to its victim until dislodged. When the squig hits, it attempts to wound with a strength of 3. Furthermore, in every additional round of combat between the orc and the squig's victim, the squig makes an automatic strength 3 hit. The squig is pulled off if 1) its master is knocked down, stunned, or taken out of action, 2) either combatant flees or otherwise leaves combat, 3) the victim is taken out of action, or 4) the victim is knocked down or stunned, and the orc is facing additional, standingopponents."
  },
  {
    name: "Doesn't Mind Well",
    description: "Chained Attack Squig - Although an attack squig is normally chained to an orc's wrist, it lunges and pulls at its chain. Managing the little hellion requires the full use of the orc's arm. No other weapon, shield, or item may be used in one of the orc's hands during the battle. Note that the orc may use missile weapons with no penalty (provided his other arm is intact!)."
  },
  {
    name: "No Save",
    description: "Claw of the Old Ones - The blade of the Claw can literally cut through anything. A warrior wounded by a Claw receives no armour save whatsoever..\nSun Gauntlet - The beam from a Sun Gauntlet can literally cut through anything. A warrior wounded by a Sun Gauntlet receives no armour save whatsoever..\nSunstaff - The beam from a Sunstaff can literally cut through anything. A warrior wounded by a Sunstaff receives no armour save whatsoever."
  },
  {
    name: "+1 Enemy Armor Save",
    description: "Dagger - Daggers are not the best weapons to use for penetrating an enemy model's armour. An enemy wounded by a dagger gains a +1 bonus to his armour save, and a 6+ armour save if he has none normally."
  },
  {
    name: "Critical Damage",
    description: "Dark Elf Blade - Dark Elf blades inflict serious damage on their opponents. When rolling on the critical hit chart, a Dark Elf blade will add +1 to the result.."
  },
  {
    name: "Wicked Edge",
    description: "Dark Elf Blade - Dark Elf blades are set with sharp protrusions and serrated edges which inflict serious damage on an opponent. A roll of 2-4 is a stunned result."
  },
  {
    name: "+1 Armour Save",
    description: "Disease Dagger - A model wounded by a dagger has a +1 Armour Save bonus, or an armour save of 6+ if he has no armour.."
  },
  {
    name: "Infecting",
    description: "Disease Dagger - A natural 6 on a to hit roll means that the target has been infected with the disease and that he must take a toughness test. Roll a D6. If the result is higher than the toughness of the model taking the test, he will suffer an automatic wound in addition to the dagger hit. Models of undead and possessed are immune to this disease and do not take the test. A model wielding two Diseases Daggers gains a +1 Attack bonus for wielding two weapons and there is no further effect, except that the chances of rolling an infecting 6 on the hit rolls are higher."
  },
  {
    name: "Strike Last",
    description: "Double-Handed Sword, Hammer, Axe, Etc - Double-handed weapons are so heavy that the model using them always strikes last, even when charging.\nGreat Axe - Great Axes are so heavy that the model using them always strikes last, even when charging..\nMaul - Mauls are so easy that the model using one always strikes last, even when charging.."
  },
  {
    name: "Climb",
    description: "Fighting Claws - A Skaven equipped with Fighting Claws can add +1 to his Initiative when making Climbing tests.."
  },
  {
    name: "+1 Enemy armour save",
    description: "Fist - An enemy wounded by a fist gains a +1 bonus to his armour save, and a 6+ armour save if he normally has none."
  },
  {
    name: "Concussion",
    description: "Hammer, Staff, Mace or Club. - Hammers and other bludgeoning weapons are excellent to use for striking your enemy senseless. When using a hammer, club or mace, a roll of 2-4 is treated as stunned when rolling to see the extent of a model's injuries.\nSigmarite Warhammer - Warhammers are excellent at striking people senseless. When using a Warhammer in close combat a roll of 2-4 is treated as Stunned when rolling on the Injury chart..\nWizard's Staff - When using a Wizard's Staff, a roll of 2-4 is treated as stunned when rolling on the injury table."
  },
  {
    name: "Cavalry Charge",
    description: "Horseman's Hammer - A model armed with a horseman's hammer may use the speed of his charge to increase the might of his attacks. A model on a steed with a horseman's hammer gains a further +1 Strength bonus when he charges. This bonus only applies for that turn."
  },
  {
    name: "Kick Attack",
    description: "Iron Shod Boots - Any warrior wearing a pair of iron shod boots may make an additional kick attack in hand-to-hand combat each turn. The attack is resolved at -1 to hit."
  },
  {
    name: "Teeth",
    description: "Kraken-Tooth Sword - The razor-sharp teeth of these blades can saw through all obstacles. A Kraken-Tooth Sword ignores armour saves. Successful attacks made with this weapon cause an additional wound."
  },
  {
    name: "Cavalry Weapon",
    description: "Lance - A warrior must own a warhorse to use a lance, as it can only be used whilst he is on horseback.."
  },
  {
    name: "Cavalry Bonus",
    description: "Lance - If using optional rules for mounted models, a warrior armed with a lance receives a +2 Strength bonuswhen he charges. This bonus only applies for that turn.\nSpear - If using the rules for mounted models, a mounted warrior armed with a spear receives a +1 Strength bonus when he charges. This bonus only applies for that turn."
  },
  {
    name: "Force",
    description: "Maul - A maul forces its way through nearly all defences. Mauls cannot be Parried and impose an additional -1AS modifier. Due to its weight, a Maul also confers a -1 penalty to the model's Initiative."
  },
  {
    name: "Difficult to Use",
    description: "Morning Star - A model with a morning star may not use a second weapon or buckler in his other hand because it requires all his skill to wield it. He may carry a shield as normal though."
  },
  {
    name: "Blemished",
    description: "Obsidian Weapon - Although not strictly tainted by Chaos, all artefacts of Obsidian are considered tinged with evil, by the same darkness associated with their artisans. Obsidian weapons may never be used by Dwarves, Elves, Sisters of Sigmar, Witch Hunters or Priests.."
  },
  {
    name: "Holy Weapon",
    description: "Sigmarite Warhammer - Each Warhammer is blessed by the High Matriarch herself before it is handed to the Sisters. The Warhammer has a +1 bonus on all to wound rolls against any Possessed or Undead models. Note that you will still need to score a 6 before any modifiers in order to cause a critical hit. Only Matriarchs and Sister Superiors may carry two Sigmarite Warhammers."
  },
  {
    name: "Heart-seeker",
    description: "Silver-tipped Stake - Such is the destructive power of silver over a Vampire's form that a Silver-tipped Stake adds +1 to the injury roll when it causes a wound."
  },
  {
    name: "Strike First",
    description: "Spear - A warrior with a spear strikes first in the first turn of hand-to-hand combat..\nTrident - A warrior with a Trident strikes first in the first turn of hand-to-hand combat.."
  },
  {
    name: "Unwieldy",
    description: "Spear - A warrior with a spear may only use a shield or a buckler in his other hand. He may not use a second weapon.."
  },
  {
    name: "Parry Twice",
    description: "Staffsword - A model armed with a Staffsword may attempt to Parry two blows per combat round."
  },
  {
    name: "+1 Attack",
    description: "Staffsword - Due to its double-ended blades, a model armed with a Staffsword may make an additional attack in the Close Combat phase as if he were armed with an off-hand weapon."
  },
  {
    name: "Cannot Be Parried",
    description: "Steel Whip - The steel whip is a flexible weapon and the Priestesses use it with great expertise. Attempts to parry its strikes are futile. A model attacked by a steel whip may not make parries with swords or bucklers.."
  },
  {
    name: "Whip crack",
    description: "Steel Whip - when the wielder charges they gain +1A for that turn. This bonus attack is added after any other modifications. When the wielder is charged, they gain +1A that they may only use against the charger. This additional attack will 'strike first'. If the wielder is simultaneously charged by two or more opponents, they will still only receive a total of +1A. If the wielder is using two whips at the same time then they get +1A for the additional hand weapon, but only the first whip gets the whip crack +1A."
  },
  {
    name: "Trap Blade",
    description: "Sword Breaker - Whenever you make a successful parry attempt roll a D6. If you score a 4+, you break the weapon your opponent was using. The weapon is now useless and they must use another one, or if they have no other weapon, resort to unarmed combat."
  },
  {
    name: "Pincers",
    description: "Veteran's Hand - The Hero may carry no weapons in this arm, but gains an extra attack in close combat with a +1 strength bonus while wearing the Veteran's Hand.. Two-handed weapons are impossible to use with a Veteran's Hand.."
  },
  {
    name: "Prosthetic",
    description: "Veteran's Hand - Heroes with a Serious Injury who have lost a hand or arm due to a 'Hand Injury' or 'Arm Wound' can be fitted with a Veteran's Hand. A Hero with a 'Hand Injury' ignores the penalty applied to Weapon Skill. If the injured wearer gets a 'Hand Injury' or 'Arm Wound' in further battles, these can be ignored on a roll of 4+ as the hit was taken by the Veteran's Hand instead, but on a roll of 6 the Veteran's Hand is destroyed.When being worn as a prosthetic, the Veteran's Hand may be used in any scenario which prohibits the use of weapons. Scenarios such as, 'Last Orders!' or 'Pit of Blood' (see the 'Mutiny in Marienburg' Mordheim supplement for more details)."
  },
  {
    name: "Cannot be parried",
    description: "Whip - The whip is a flexible weapon and the Mule Skinner uses it with great expertise. Attempts to parry its strikes are futile. A model attacked by a whip may not make parries with swords or bucklers.."
  },
  {
    name: "Hard to reload",
    description: "Ballista - Massive force is required to reload this device. A model trying to reload the Ballista must spend a full turn doing nothing else and must pass a strength test to succeed."
  },
  {
    name: "Kickback",
    description: "Ballista - The power in this device is so powerful that when the bow flings forward and the bolt is launched, the firer is thrown 1d3 inches in the direction of the shot. If the model hits wall or another model, he/both models suffer a S3 hit."
  },
  {
    name: "Difficult aim",
    description: "Ballista - Due to the size of the Ballista, aiming is a bit harder than other missile weapons. The penalty for firing over half range is -2 to hit instead of -1."
  },
  {
    name: "Wheeled",
    description: "Ballista - Dragging along a Ballista is hard work and the user may not run. Neither can he move and shoot the Ballista in the same turn, and he cannot climb or move up or down ladders."
  },
  {
    name: "Huge",
    description: "Ballista - The Ballista is a huge weapon. A warrior \"carrying\" a Ballista may not have any other missile weapons."
  },
  {
    name: "Holy",
    description: "Blessed Bolts - Any Chaotic being, be they Undead, Chaos-infused (Mutants or Possessed), or Twister of Magic, suffer greatly from these missiles. Add +1 to the strength of the weapon when fired against such a target."
  },
  {
    name: "Save +1",
    description: "Blowpipe - Allows the victim +1 to their Save, or if they have no save roll, they may roll a 6+."
  },
  {
    name: "Poison",
    description: "Blowpipe - The needles fired by a blowpipe are coated in a venom very similar in its effects to the Black Lotus (if you roll a 6 on the To Hit roll, the victim is automatically wounded). A blowpipe cannot cause critical hits. This weapon has a positive armour save modifier, so a model that normally has a save of 5+ will get a save of 4+ against a blowpipe dart. Even models that normally do not have an armour save will get a 6+ save to take into account protection offered by clothes, fur or the like.."
  },
  {
    name: "Stealthy",
    description: "Blowpipe - A model armed with a blowpipe can fire while hidden without revealing his position to the enemy. The target model can take an Initiative test in order to try to spot the firing model. If the test is successful, the shooter no longer counts as hidden."
  },
  {
    name: "Dangerous",
    description: "Bolas - If the to hit roll is a natural 1, the Bolas brains the caster with a S3 hit.."
  },
  {
    name: "Entangle",
    description: "Bolas - A model hit by a Bolas isn't hurt, but is entangled. The model is unable to move and suffers a WS penalty of -2 in Hand-To-Hand combat. The model may still shoot and may try to free itself in the recovery phase. If he rolls 4+ on a D6 he is freed and may move and fight normally."
  },
  {
    name: "Thrown weapon",
    description: "Cathayan Candles - A model using Cathayan Candles does not suffer penalties for range or moving..\nCathayan Candle - Models using Cathayan Candles do not suffer penalties for range or moving as these weapons are perfectly balanced for throwing. They cannot be used in close combat."
  },
  {
    name: "Volatile",
    description: "Cathayan Candles - On a roll of 1 to hit, the Cathayan Candle has exploded in the thrower's hand. Roll to wound as normal, treating the thrower as the target..\nCathayan Candle - On a roll of 1 to hit, Cathayan candles explode in the thrower's hand. Roll to wound treating the throwing model as the target."
  },
  {
    name: "Set on Fire",
    description: "Cathayan Candles - Any target hit with a Cathayan Candle may catch fire. Roll a d6. On a roll of 5+ the target has been Set on Fire. The burning model must roll a D6 in the recovery phase. On a roll of a 4+ they have managed to put out the flames. If the roll is unsuccessful, they suffer a strength 4 hit and will be unable to do anything other than move while on fire. Allies may also attempt to put out the flames."
  },
  {
    name: "Shoot in Hand-to-Hand Combat",
    description: "Crossbow Pistol - A model armed with a crossbow pistol may shoot it in the first round of a hand-to-hand combat and this shot is always resolved first, before any blows are struck. This shot has an extra -2 to hit penalty. Use model's Ballistic Skill to see whether it hits or not. This bonus attack is in addition to any close combat weapon attacks."
  },
  {
    name: "-1 Save Modifier",
    description: "Elf Bow - An Elf bow has a -1 save modifier on armour saves against it."
  },
  {
    name: "Move or Fire",
    description: "Harpoon Gun - a model cannot move (including moving to man the Harpoon Gun) and shoot in the same turn.\nDouble-Barrelled Handgun - You may not move and fire a handgun in the same turn, other than to pivot on the spot to face your target or stand up.\nDouble-barreled Hunting Rifle - You may not move and fire a handgun in the same turn, other than to pivot on the spot to face your target or stand up.\nHandgun - You may not move and fire a handgun in the same turn, other than to pivot on the spot to face your target or stand up.\nHochland Long Rifle (or Hunting Rifle) - You may not move and fire a Hochland long rifle in the same turn, other than to pivot on the spot to face your target or stand up from knocked down.."
  },
  {
    name: "Prepare Shot",
    description: "Harpoon Gun - Harpoon guns can only shoot every other round, and no Skills or abilities can modify this.\nDouble-Barrelled Duelling Pistols - A dueling pistol takes a complete turn to reload, so your model may only fire every other turn. If he has a brace of dueling pistols he may fire every turn.\nDouble-Barrelled Handgun - A handgun takes a complete turn to reload, so you may only fire it every other turn.\nDouble-barreled Hunting Rifle - A handgun takes a complete turn to reload, so you may only fire it every other turn.\nDouble-barrelled Pistol / brace - A dueling pistol takes a complete turn to reload, so your model may only fire every other turn. If he has a brace of dueling pistols he may fire every turn.\nDuelling Pistol/Brace - A duelling pistol takes a complete turn to reload, so your model may only fire every other turn. If he has a brace of duelling pistols, he may fire every turn..\nHandgun - A handgun takes a complete turn to reload, so you may only fire it every other turn.\nHochland Long Rifle (or Hunting Rifle) - A Hochland long rifle takes a complete turn to reload, so you may only fire it every other turn..\nPistol/brace - A pistol takes a whole turn to reload, so you may only fire every other turn. If you have a brace of pistols (i..\nSword-Pistol - The same rules as  ̳pistol'.\nWarplock Pistol/brace - A pistol takes a whole turn to reload, so you may only fire every other turn. If you have a brace of pistols (i.. e., two) you may fire every turn."
  },
  {
    name: "Save Modifier",
    description: "Harpoon Gun - wounds dealt by a Harpoon Gun have an additional -1 to the armour save (for a total of -2).\nDouble-Barrelled Duelling Pistols - Dueling pistols are even better at penetrating armor than their Strength 4 suggests. A warrior wounded by a dueling pistol must make his armor save with a -2 modifier.\nDouble-Barrelled Handgun - Handguns are even better at penetrating armor than their Strength 4 suggests. A warrior wounded by a handgun must take its armor save with a -2 modifier.\nDouble-barreled Hunting Rifle - Handguns are even better at penetrating armor than their Strength 4 suggests. A warrior wounded by a handgun must take its armor save with a -2 modifier.\nDouble-barrelled Pistol / brace - Dueling pistols are even better at penetrating armor than their Strength 4 suggests. A warrior wounded by a dueling pistol must make his armor save with a -2 modifier.\nDuelling Pistol/Brace - Duelling pistols are even better at penetrating armour than their Strength 4 suggests. A warrior wounded by a duelling pistol must make his armour save with a -2 modifier..\nHandgun - Handguns are even better at penetrating armour than their Strength 4 suggests. A warrior wounded by a handgun must take its armour save with a -2 modifier.\nHochland Long Rifle (or Hunting Rifle) - Hochland long rifles are even better at penetrating armour than their Strength 4 suggests. A warrior wounded by a long rifle must make his armour save with a -2 modifier.\nLong Barreled Pistol - As per the Mordheim rulebook.\nPistol/brace - Pistols are even better at penetrating armour than their Strength value of 4 suggests. A model wounded by a pistol must take its armour save with a -2 modifier..\nRepeater Handgun - Pistols are even better at penetrating armor than their Strength value of 4 suggests. A model wounded by a pistol must take its armor save with a -2 modifier.\nWarplock Pistol/brace - Warplock pistols are even better at penetrating armour than their Strength value of  5 suggests. A model wounded by a pistol must take its armour save with a -3 modifier."
  },
  {
    name: "Reel 'em In",
    description: "Harpoon Gun - any model hit and wounded by the Harpoon Gun must make a Strength test, otherwise they are harpooned and the firer may move them 8\ closer. Every turn after being harpooned the victim may make a Strength test to escape otherwise they are reeled in a further 8\". Whilst harpooned the victim may not move but can act as normal. A friendly model may cut them free on a successful WS test."
  },
  {
    name: "Thrown Weapon",
    description: "Hunter's Throwing Axe - Hunter's Throwing Axes are, of course, thrown weapons, and the warrior suffers no penalties for moving and shooting.\nJavelins - Javelins are thrown weapons and the warrior suffers no penalties for moving and shooting.\nMagnin Throwing Knives - Magnin Throwing Knives are, of course, thrown weapons and the warrior suffers no penalties for moving and shooting..\nThrowing Stars/Knives/Axes - Models using throwing stars or knives do not suffer penalties for range or moving as these weapons are perfectly balanced for throwing. They cannot be used in close combat."
  },
  {
    name: "Weighted",
    description: "Magnin Throwing Knives - These exquisitely crafted thrown blades have an increased chance of causing a Critical Hit."
  },
  {
    name: "Fire Twice",
    description: "Repeater Crossbow - A model armed with a repeater crossbow may choose to fire twice per turn with an extra -1 to hit penalty on both shots.\nDouble-Barreled Blunderbuss - It takes a very long time to load either barrel of the blunderbuss, so it may only be fired twice per battle. Alternatively, the user may fire both shots simultaneously, dealing 2S3 hits instead of 1."
  },
  {
    name: "Accurate",
    description: "Sun Gauntlet - The Sun Gauntlet does not suffer the usual -1 modifier to hit for long range..\nSunstaff - The Sunstaff does not suffer the usual -1 modifier to hit for long range.."
  },
  {
    name: "Hand-to-Hand",
    description: "Sun Gauntlet - The Sun Gauntlet can be used with another close combat weapon in hand to hand combat with Strength 4 and no armour save. Because it does not require prepared shot, this bonus attack may be used in each turn of combat.\nDouble-Barrelled Duelling Pistols - Dueling pistols can be used in hand-to-hand combat as well as for shooting. A model armed with a dueling pistol and another close combat weapon gains +1 Attack, which is resolved at Strength 4 with a -2 save modifier. This bonus attack can be used only once per combat. If you are firing a brace of dueling pistols, your model can fight with 2 Attacks in the first turn of close combat. These attacks are resolved with a model's Weapon Skill like any normal close combat attack and likewise may be parried. Successful hits are resolved at Strength 4 and with a -2 save modifier, regardless of the firer's Strength.\nDouble-barrelled Pistol / brace - Dueling pistols can be used in hand-to-hand combat as well as for shooting. A model armed with a dueling pistol and another close combat weapon gains +1 Attack, which is resolved at Strength 4 with a -2 save modifier. This bonus attack can be used only once per combat. If you are firing a brace of dueling pistols, your model can fight with 2 Attacks in the first turn of close combat. These attacks are resolved with a model's Weapon Skill like any normal close combat attack and likewise may be parried. Successful hits are resolved at Strength 4 and with a -2 save modifier, regardless of the firer's Strength.\nDuck-Footed Pistol - The Duck-Footed Pistol may be fired in the first round of combat, just like a normal pistol. Using the Wielder's Weapon Skill, the Pistol provides an additional attack at Strength 3. If the initial attack hits and is not parried, 1D3 models in base contact with the firer are also hit with S3 hits. The closest model to the target must take the first hit, then the next closest, and so on. Again, the firer can accidentally hit members of his own warband this way. This does NOT count as 'shooting into combat', so the shots are not randomized. A model cannot be hit with multiple hits for only one shot (except for 'Richochet' critical hits.) Once fired in the first round, a Duck-Footed Pistol may not be fired for the rest of that combat.\nDuelling Pistol/Brace - Duelling pistols can be used in hand-to-hand combat as well as for shooting. A model armed with a duelling pistol and another close combat weapon gains +1 Attack, which is resolved at Strength 4 with a -2 save modifier. This bonus attack can be used only once per combat. If you are firing a brace of duelling pistols, your model can fight with 2 Attacks in the first turn of close combat. These attacks are resolved with a model's Weapon Skill like any normal close combat attack and likewise may be parried. Successful hits are resolved at Strength 4 and with a -2 save modifier, regardless of the firer's Strength.\nPistol/brace - Pistols can be used in hand-to-hand combat as well as for shooting. A model armed with a pistol and another close combat weapon gains +1 Attack, which is resolved at Strength 4 with a -2 save modifier. This bonus attack can be used only once per combat. If you are firing a brace of pistols, your model can fight with 2 Attacks in the first turn of close combat. These attacks are resolved with a model's Weapon Skill like any normal close combat attack and likewise may be parried. Successful hits are resolved at Strength 4 and with a -2 save modifier, regardless of the firer's Strength.\nRepeater Handgun - Pistols can be used in hand-to-hand combat as well as for shooting. A model armed with a pistol and another close combat weapon gains +1 Attack, which is resolved at Strength 4 with a -2 save modifier. This bonus attack can be used only once per combat. If you are firing a brace of pistols, your model can fight with 2 Attacks in the first turn of close combat. These attacks are resolved with a model's Weapon Skill like any normal close combat attack and likewise may be parried. Successful hits are resolved at Strength 4 and with a -2 save modifier, regardless of the firer's Strength.\nSword-Pistol - While a Sword Pistol can be used in hand-to-hand combat as a sword, it may also be used to shoot into combat. Once per combat, a model armed with a loaded Sword Pistol may replace one of his normal attacks with a Pistol shot, which is resolved at +1 hit, S4, and with a -1 Armor save modifier, regardless of the user's strength. In all ther attacks that combat, the sword pistol is treated as a sword (and, if your group uses the optional critical hit chart, it deals damage as a  ̳bladed weapon'.) You do NOT receive +1 to hit on all attacks, only the single ―pistol‖ attack.\nWarplock Pistol/brace - Pistols can be used in hand-to-hand combat as well as for shooting. A model armed with a pistol and another close combat weapon gains +1 Attack, which is resolved at Strength 4 with a -2 save modifier. This bonus attack can be used only once per combat. If you are firing a brace of pistols, your model can fight with 2 Attacks in the first turn of close combat. These attacks are resolved with a model's Weapon Skill like any normal close combat attack and likewise may be parried. Successful hits are resolved at Strength 4 and with a -2 save modifier, regardless of the firer's Strength."
  },
  {
    name: "Fire every other turn",
    description: "Tufenk - The Tufenk is tricky to reload and takes a whole turn to prepare a shot. You may only fire once every other turn.."
  },
  {
    name: "Cause fire damage",
    description: "Tufenk - If you hit, roll a D6. On a roll of 4+ your opponent is set on fire. They must roll a D6 each Recovery phase. On a 4+ they extinguish the fire, otherwise they immediately suffer a S4 hit and may only move. Friendly models may help in extinguishing the model that is ablaze. They must be in base-to-base contact and need to roll a 4+ on a D6. Against dry targets like Mummies, they are S3 hits and on a 2+ on a D6 the Mummy catches fire."
  },
  {
    name: "Shot",
    description: "Blunderbuss - When your model fires the blunderbuss, draw a line 16\" long and 1\" wide in any direction from the firer (the line must be absolutely straight). Any and all models in its path are automatically hit by a Strength 3 hit..\nDouble-Barreled Blunderbuss - When your model fires the blunderbuss, draw a line 16\" long and 1\" wide in any direction from the firer (the line must be absolutely straight). Any and all models in its path are automatically hit by a Strength 3 hit."
  },
  {
    name: "Fire Once",
    description: "Blunderbuss - It takes a very long time to load a blunderbuss so it may only be fired it once per battle."
  },
  {
    name: "Set on fire",
    description: "Cathayan Candle - If you hit with the Cathayan candles roll a D6. If you score a 5+ your opponent has been set on fire. They must roll a D6 in the Recovery phase and score a 4+ to put themselves out or they will suffer a Strength 4 hit and will be unable to do anything other than move for each turn they are on fire. Allies may also attempt to put the warrior out. They must be in base contact and need a 4+ to be  successful."
  },
  {
    name: "Blast Charge",
    description: "Cinderblast Bomb - the Cinderblast uses a small blast template as its radius. Any model hit directly by a Cinderblast suffers D3 Strength 6 Hits, any model under the rest of the template suffers 1 Strength 3 Hit."
  },
  {
    name: "Scatter",
    description: "Cinderblast Bomb - if the sappper fails the BS to hit roll the charge misses the target it scatters a random direction D6 inches from the Sapper."
  },
  {
    name: "Accuracy",
    description: "Double-Barrelled Duelling Pistols - A dueling pistol is built for accuracy as a skilled duelist is able to hit a coin from twenty paces. All shots and close combat attacks from a dueling pistol have a +1 bonus to hit.\nDuelling Pistol/Brace - A duelling pistol is built for accuracy as a skilled duellist is able to hit a coin from twenty paces. All shots and close combat attacks from a duelling pistol have a +1 bonus to hit..\nSword-Pistol - When firing its Pistol shot, the Sword Pistol adds +1 to its rolls to hit."
  },
  {
    name: "Double-barrelled",
    description: "Double-Barrelled Duelling Pistols - A double-barrelled weapon is a tricky piece of engineering, but it's a wonderful piece for combat. When firing such a weapon, the bearer must declare whether he is firing one or both barrels. If firing a single barrel, treat the shot as you would a normal weapon.\nDouble-Barrelled Handgun - A double-barrelled weapon is a tricky piece of engineering, but it's a wonderful piece for combat. When firing such a weapon, the bearer must declare whether he is firing one or both barrels. If firing a single barrel, treat the shot as you would a normal weapon.\nDouble-barreled Hunting Rifle - A double-barrelled weapon is a tricky piece of engineering, but it's a wonderful piece for combat. When firing such a weapon, the bearer must declare whether he is firing one or both barrels. If firing a single barrel, treat the shot as you would a normal weapon.\nDouble-barrelled Pistol / brace - A double-barrelled weapon is a tricky piece of engineering, but it's a wonderful piece for combat. When firing such a weapon, the bearer must declare whether he is firing one or both barrels. If firing a single barrel, treat the shot as you would a normal weapon."
  },
  {
    name: "the method changes slightly",
    description: "Double-Barrelled Duelling Pistols - To hit - roll a single dice as you would normally. This allows for a narrow field of fire emanating from the weapon. To wound - roll for each shot individually, as each To wound shot can wound on its own. Treat each shot that inflicts Critical Hits separately.\nDouble-Barrelled Handgun - To hit - roll a single dice as you would normally. This allows for a narrow field of fire emanating from the weapon. To wound - roll for each shot individually, as each To wound shot can wound on its own. Treat each shot that inflicts Critical Hits separately.\nDouble-barreled Hunting Rifle - To hit - roll a single dice as you would normally. This allows for a narrow field of fire emanating from the weapon. To wound - roll for each shot individually, as each To wound shot can wound on its own. Treat each shot that inflicts Critical Hits separately.\nDouble-barrelled Pistol / brace - To hit - roll a single dice as you would normally. This allows for a narrow field of fire emanating from the weapon. To wound - roll for each shot individually, as each To wound shot can wound on its own. Treat each shot that inflicts Critical Hits separately."
  },
  {
    name: "Pick target",
    description: "Double-barreled Hunting Rifle - A model armed with a Hochland long rifle can target any enemy model in sight, not just the closest one."
  },
  {
    name: "Black-powder",
    description: "Duck-Footed Pistol - A Duck-Footed Pistol is a blackpowder weapon, and a natural roll of 1 to hit causes a misfire (roll on the Blackpowder misfire table.) If the result BOOM is rolled, the wielder suffers 1D3+1 St 3 hits."
  },
  {
    name: "Spread-Shot",
    description: "Duck-Footed Pistol - If firing at ranged targets and  the target is hit, the closest 1D3 models within 2\" of the target are automatically hit with bullets too. The firer cannot hit himself (nor count as the 'closest model' for the rules below), but he can accidentally hit members of his own warband. If the original target was in the open, no hits can be applied to models in cover though (only if the original target was in cover can hits go to models in cover as well). The closest model to the target must take the first hit, then the next closest, and so on. Models in Hiding will also count towards being close to the target, and can be hit as well. There is no Armour Save modifier from Spread Shot hits."
  },
  {
    name: "Loading Time",
    description: "Duck-Footed Pistol - Loading the many barrels of the Duck-Footed Pistol is a difficult task, even for expert gunners. Because of this, it always takes a full turn to reload a Duck-Footed Pistol, regardless of skills the firer might know. He may not fire any non-pistol weapons while reloading."
  },
  {
    name: "Unbraced",
    description: "Duck-Footed Pistol - You cannot buy a brace of Duck-Footed Pistols, and a single hero can only own one Duck-Footed Pistol at a time. If the firer knows the skill Pistolier, they may fire a Duck-Footed Pistol and a second pistol of any other type at the same time."
  },
  {
    name: "Pick Target",
    description: "Hochland Long Rifle (or Hunting Rifle) - A model armed with a Hochland long rifle can target any enemy model in sight, not just the closest one.."
  },
  {
    name: "Prepared Shot",
    description: "Long Barreled Pistol - As per the Mordheim rulebook."
  },
  {
    name: "Hand-to-hand",
    description: "Long Barreled Pistol - As per the Mordheim rulebook."
  },
  {
    name: "Scope",
    description: "Long Barreled Pistol - The Long-Barreled Pistol has a scope at the end, providing a +1 to hit when the firer is not moving this turn."
  },
  {
    name: "Fire Thrice",
    description: "Repeater Handgun - The Repeater Handgun may fire up to three shots; if more than one shot is made the to hit roll is at -1. Resolve each shot individually, you may choose to shot later shots at a different target, but they must be within 3\" of the previous target. Ordinary targeting restrictions apply to shots as per Mordheim rulebook."
  },
  {
    name: "Experimental",
    description: "Repeater Handgun - The Repeater Handgun is always subject to the optional Blackpowder Weapons rules from the Mordheim rulebook, even if they are not normally used in your campaign."
  },
  {
    name: "Dual-Use",
    description: "Sword-Pistol - The Sword Pistol counts as both a Sword and a Dueling Pistol. In the Shooting Phase, you may treat it exactly like a Dueling Pistol. In the hand-to-hand combat phase, you may treat it as either a sword or a dueling pistol (see the  ̳Hand-to-Hand' combat rules below for more details.) For the sake of bonuses and skills, it is treated as a true Sword (ex. Expert Swordsman) or true Dueling Pistol (ex. Bretonnian Corsairs) respectively."
  },
  {
    name: "Note",
    description: "Sword-Pistol - Expert Swordsman only lets you reroll SWORD attacks- you may not reroll the Pistol shot, even if it was fired while charging."
  },
  {
    name: "Modifier",
    description: "Sword-Pistol - All pistol shots from a Sword Pistol apply an additional -1 Armor save modifier."
  },
  {
    name: "Easy-to-Use",
    description: "Sword-Pistol - Any model that is able to use both a Sword and a Dueling Pistol is able to use a\nSword Pistol. If they can use both of those items, they do not require either the skills  ̳Weapons\nTraining,  ̳Weapons Expert' nor  ̳Pistol Expertise' to use the Sword Pistol."
  },
].map((item) => {
  return {
    ...item,
    id: usable_ids.pop()!,
  };
});

let melee_weapons: Weapon[] = [
  {
    name: "Axe",
    description: "The axe is the traditional weapon of Empire woodsmen, and is also used as a weapon in poorer rural areas. Axes have a heavy blade and, if swung by a strong man, can cause a lot of damage. The blade of an axe can easily cut through armour, though it requires considerable strength from the wielder.Of all the warriors in the Old World, Dwarves are the most adept at making axes. Their axes are invaluable to the warriors of the Old World and are some of the most sought-after weapons.",
    availability: [{ id: usable_ids.pop()!, rarity: 0, restrictions: [] }], price: "5",
    weapon_type: WeaponType.Melee, source: "",
    source_type: SourceStatus.Unknown, range: "Close Combat",
    strength: "As user",
    special_rules: [special_rules[0].id!]
  },
  {
    name: "Beastlash",
    description: "The Beastmaster make good use of their whips to goad their hounds and creatures into combat.",
    availability: [{ id: usable_ids.pop()!, rarity: 8, restrictions: [{ restriction_type: RestrictionType.WarbandGroup, restriction: "Dark Elves" }] }], price: "10+D6",
    weapon_type: WeaponType.Melee, source: "",
    source_type: SourceStatus.Unknown, range: "Close Combat",
    strength: "As user -1",
    special_rules: [special_rules[1].id!, special_rules[2].id!]
  },
  {
    name: "Belaying Pin",
    description: "A typical ship contains hundreds of these short lengths of carved wood. They are set up in racks in convenient places in the ship, around which the running rigging can be secured or belayed. These also make good weapons, and pirates quickly become proficient with hurling them as short-range weapons.",
    availability: [{ id: usable_ids.pop()!, rarity: 0, restrictions: [{ restriction_type: RestrictionType.WarbandGroup, restriction: "Pirates" }] }], price: "3",
    weapon_type: WeaponType.Melee, source: "",
    source_type: SourceStatus.Unknown, range: "6\"",
    strength: "As User -1",
    special_rules: [special_rules[3].id!]
  },
  {
    name: "Boat Hook",
    description: "These are normally used to pull in ropes or other objects from the water, but their long reach and wicked metal catches makes them also useful in combat.",
    availability: [{ id: usable_ids.pop()!, rarity: 0, restrictions: [{ restriction_type: RestrictionType.WarbandGroup, restriction: "Pirates" }] }], price: "8",
    weapon_type: WeaponType.Melee, source: "",
    source_type: SourceStatus.Unknown, range: "Close Combat",
    strength: "As user -1",
    special_rules: [special_rules[4].id!]
  },
  {
    name: "Brass Knuckles",
    description: "Brass Knuckles are a weapon commonly used by street thugs and robbers who are all too common an infestation in the mighty cities of the Empire. Easily secreted, they are used in pairs and, while cumbersome to use in a straight fight, can cause crippling blows to an opponent with a single, well-landed punch.",
    availability: [{ id: usable_ids.pop()!, rarity: 0, restrictions: [] }], price: "20",
    weapon_type: WeaponType.Melee, source: "",
    source_type: SourceStatus.Unknown, range: "Close combat",
    strength: "+1",
    special_rules: [special_rules[5].id!, special_rules[6].id!]
  },
  {
    name: "Cathayan Longsword",
    description: "Prized indeed are blades of Ithilmar forged by Elves. Even more masterful are the arms crafted by swordsmiths in Cathay. Known as a Jintachi Blade among Estalian merchants, the Cathayan Longsword is a deadly crown jewel in the hands of a skilled fighter. Gold alone is never enough to acquire such a weapon. Jintachi are heirlooms and highly coveted. The few still smithed are gifted only in reward for some heroic deed that is done in the kingdoms of the east.",
    availability: [{ id: usable_ids.pop()!, rarity: 12, restrictions: [] }], price: "75 +2D6",
    weapon_type: WeaponType.Melee, source: "",
    source_type: SourceStatus.Unknown, range: "Close Combat",
    strength: "As User",
    special_rules: [special_rules[9].id!, special_rules[0].id!, special_rules[10].id!]
  },
  {
    name: "Celestial Iron Fan",
    description: "Grand Masters of Dragon Monk brotherhoods have been known to fight armed with the most curious of items. One such secret of Cathay's weaponsmiths are Iron Fans. Celestial Iron Fans can flick deadly force with the grace of a dance.",
    availability: [{ id: usable_ids.pop()!, rarity: 12, restrictions: [] }], price: "125",
    weapon_type: WeaponType.Melee, source: "",
    source_type: SourceStatus.Unknown, range: "Close Combat",
    strength: "As User",
    special_rules: [special_rules[9].id!, special_rules[11].id!, special_rules[12].id!]
  },
  {
    name: "Censer",
    description: "The Censer is a hollow, spiked metal ball attached to a long chain and is swung like a flail. A plague infested shard of warpstone burns inside the ball and emits pestilential fumes that nauseate the opponents and may turn the wielder of the Censer into a difficult target to shoot at.",
    availability: [{ id: usable_ids.pop()!, rarity: 9, restrictions: [{ restriction_type: RestrictionType.WarbandGroup, restriction: "Clan Pestilens" }] }], price: "40",
    weapon_type: WeaponType.Melee, source: "",
    source_type: SourceStatus.Unknown, range: "Close Combat",
    strength: "As User +2",
    special_rules: [special_rules[13].id!, special_rules[4].id!, special_rules[14].id!]
  },
  {
    name: "Chain Sticks",
    description: "Consisting of wooden bars tied together, Chain Sticks are enhanced with iron or steel to gain more striking power. Compared to a Flail it is light, providing the bearer more flexibility in combat.",
    availability: [{ id: usable_ids.pop()!, rarity: 8, restrictions: [] }], price: "20",
    weapon_type: WeaponType.Melee, source: "",
    source_type: SourceStatus.Unknown, range: "Close Combat",
    strength: "As User",
    special_rules: [special_rules[4].id!, special_rules[15].id!]
  },
  {
    name: "Chained Attack Squig",
    description: "Small, vicious attack squigs are often herded towards the enemy by orcs and goblins in battle. Orcs of status may find the time and patience to train an attack squig as a pet and guard animal. An orc will normally keep his attack squig chained to his arm, and will merrily throw or swing his squig into combat when engaging the enemy. ",
    availability: [{ id: usable_ids.pop()!, rarity: 0, restrictions: [{ restriction_type: RestrictionType.WarbandGroup, restriction: "Greenskins" }] }], price: "10",
    weapon_type: WeaponType.Melee, source: "",
    source_type: SourceStatus.Unknown, range: "Close Combat",
    strength: "3 (Cannot be modified)",
    special_rules: [special_rules[16].id!, special_rules[17].id!, special_rules[18].id!]
  },
  {
    name: "Claw of the Old Ones",
    description: "This is a very ancient weapon made from a strange metal that is impervious to age and corrosion. The powers of this artefact can only be unleashed through a ritual known only to a handful of Amazons. The blade of this weapon glows white hot and can cut through armour as if it were paper.",
    availability: [{ id: usable_ids.pop()!, rarity: 12, restrictions: [{ restriction_type: RestrictionType.Warband, restriction: "Amazons" }] }], price: "30",
    weapon_type: WeaponType.Melee, source: "",
    source_type: SourceStatus.Unknown, range: "Close Combat",
    strength: "As user +1",
    special_rules: [special_rules[19].id!, special_rules[9].id!]
  },
  {
    name: "Dagger",
    description: "Daggers and knives are extremely common, and men are allowed to carry them in enclaves where weapons are otherwise forbidden. Many a warrior in Mordheim has died with a dagger in his back.",
    availability: [{ id: usable_ids.pop()!, rarity: 0, restrictions: [] }], price: "1st free/2",
    weapon_type: WeaponType.Melee, source: "",
    source_type: SourceStatus.Unknown, range: "Close Combat",
    strength: "As user.",
    special_rules: [special_rules[20].id!]
  },
  {
    name: "Dark Elf Blade",
    description: "Dark Elf Blades are forged in the city of Hag Graef, the Dark Crag. They are fashioned from Blacksteel, a rare form of steel found deep within the mountains around the city. Dark Elf Blades have wicked protrusions and serrated edges, which inflict serious damage on an opponent.Any Dark Elf can upgrade a sword or dagger to a Dark Elf blade by paying an additional 20 gc at the time of purchase. Weapons upgraded to a Dark Elf Blade retain all of their abilities (i.e. swords can parry, daggers grant an armour save of 6).",
    availability: [{ id: usable_ids.pop()!, rarity: 9, restrictions: [{ restriction_type: RestrictionType.WarbandGroup, restriction: "Dark Elves" }] }], price: "+20",
    weapon_type: WeaponType.Melee, source: "",
    source_type: SourceStatus.Unknown, range: "Close Combat",
    strength: "As user",
    special_rules: [special_rules[21].id!, special_rules[22].id!]
  },
  {
    name: "Disease Dagger",
    description: "This dagger is permanently covered with a disgusting and moulderish layer of green ooze that may infect those that are hit with terrible diseases.",
    availability: [{ id: usable_ids.pop()!, rarity: 8, restrictions: [{ restriction_type: RestrictionType.WarbandGroup, restriction: "Clan Pestilens" }] }], price: "15",
    weapon_type: WeaponType.Melee, source: "",
    source_type: SourceStatus.Unknown, range: "Close Combat",
    strength: "-",
    special_rules: [special_rules[23].id!, special_rules[24].id!]
  },
  {
    name: "Double-Handed Sword, Hammer, Axe, Etc",
    description: "A blow from a double-handed axe or sword can cut a foe in half and break armour apart. It takes a long time to learn how to use these weapons and even then, only extremely strong men are able to wield them effectively.",
    availability: [{ id: usable_ids.pop()!, rarity: 0, restrictions: [] }], price: "15",
    weapon_type: WeaponType.Melee, source: "",
    source_type: SourceStatus.Unknown, range: "Close Combat",
    strength: "As user +2",
    special_rules: [special_rules[7].id!, special_rules[25].id!]
  },
  {
    name: "Dragon Sword",
    description: "Dragon Swords are great-swords that are typically used by Cathayan soldiers, Ronin and occasionally lifted by monks.",
    availability: [{
      id: usable_ids.pop()!, rarity: 10, restrictions: [
        { restriction_type: RestrictionType.Warband, restriction: "Battle Monks" },
        { restriction_type: RestrictionType.Warband, restriction: "Merchant Caravans" },
      ]
    }], price: "20",
    weapon_type: WeaponType.Melee, source: "",
    source_type: SourceStatus.Unknown, range: "Close Combat",
    strength: "As user +1",
    special_rules: [special_rules[4].id!, special_rules[9].id!]
  },
  {
    name: "Dwarf Axe",
    description: "Dwarf axes are smaller-hafted weapons made of lighter (but stronger) materials than normal axes. Dwarf Warriors are specially trained in their use and are able to use them as deftly as a Human warrior might wield a sword.",
    availability: [{ id: usable_ids.pop()!, rarity: 8, restrictions: [{ restriction_type: RestrictionType.WarbandGroup, restriction: "Dwarves" }] }], price: "15",
    weapon_type: WeaponType.Melee, source: "",
    source_type: SourceStatus.Unknown, range: "Close Combat",
    strength: "As user",
    special_rules: [special_rules[0].id!, special_rules[9].id!]
  },
  {
    name: "Fighting Claws",
    description: "The martial arts practiced by Clan Eshin employ many unusual weapons. The most famous of these are the Eshin Fighting Claws: sharp metal blades attached to the paws of a Skaven warrior. It takes a real expert to use them effectively, but an adept of Clan Eshin is a fearsome opponent when armed this way.",
    availability: [{ id: usable_ids.pop()!, rarity: 7, restrictions: [{ restriction_type: RestrictionType.WarbandGroup, restriction: "Skaven" }] }], price: "35",
    weapon_type: WeaponType.Melee, source: "",
    source_type: SourceStatus.Unknown, range: "Close Combat",
    strength: "As User.",
    special_rules: [special_rules[5].id!, special_rules[26].id!, special_rules[9].id!, special_rules[6].id!]
  },
  {
    name: "Fist",
    description: "The truly desperate, who don't even own a knife, have to fight with their bare hands. Needless to say, their chances of survival are comparable to Halflings going without food for eight hours!Note: The following rule only apply to warriors who have lost their weapons. Creatures such as Zombies, animals, etc, ignore these rules. Warriors using their fists can only ever make 1 attack.",
    availability: [{ id: usable_ids.pop()!, rarity: 0, restrictions: [] }], price: "Free",
    weapon_type: WeaponType.Melee, source: "",
    source_type: SourceStatus.Unknown, range: "Close Combat",
    strength: "As user -1",
    special_rules: [special_rules[27].id!]
  },
  {
    name: "Flail",
    description: "The flail is a heavy weapon wielded with both hands. It normally consists of heavy weights, often spiked, attached to a pole or handle by means of heavy chains. Flails drain the user's stamina quickly, but are awesomely destructive in the hands of a skilled (or unhinged) warrior.",
    availability: [{ id: usable_ids.pop()!, rarity: 0, restrictions: [] }], price: "15",
    weapon_type: WeaponType.Melee, source: "",
    source_type: SourceStatus.Unknown, range: "Close Combat",
    strength: "As user +2",
    special_rules: [special_rules[13].id!, special_rules[7].id!]
  },
  {
    name: "Great Axe",
    description: "These over-sized Battle Axes can be wielded by only the strongest of warriors.",
    availability: [{ id: usable_ids.pop()!, rarity: 8, restrictions: [] }], price: "25",
    weapon_type: WeaponType.Melee, source: "",
    source_type: SourceStatus.Unknown, range: "Close Combat",
    strength: "As User +2",
    special_rules: [special_rules[4].id!, special_rules[25].id!, special_rules[0].id!]
  },
  {
    name: "Greedy Fist",
    description: "When worn, these massive gauntlets give the ham-like fists of an ogre an even larger reach with which to crush the life from all those who oppose the wearer. Once pulped, the wearer is then compelled to eat the victim, sustaining the power gauntlets for the next attack. The Hero receives +1 Strength and -1 Toughness. Increase the reach of your melee attacks when charging by moving the warrior 1\" further forward. ",
    availability: [{ id: usable_ids.pop()!, rarity: 11, restrictions: [{ restriction_type: RestrictionType.WarbandGroup, restriction: "Ogres" }] }], price: "65",
    weapon_type: WeaponType.Melee, source: "",
    source_type: SourceStatus.Unknown, range: "Close Combat",
    strength: "As User +2",
    special_rules: []
  },
  {
    name: "Gromril Weapon",
    description: "Only a Dwarf Runesmith can forge a weapon from Gromril, a rare meteoric iron. A blade fashioned from this metal will stay keen for a thousand years.A Gromril weapon has an extra -1 save modifier, and costs four times the price of a normal weapon of its kind. You may choose which type of hand-to-hand weapon is offered to you as explained in the Trading section.",
    availability: [{ id: usable_ids.pop()!, rarity: 11, restrictions: [] }], price: "As weapon x4",
    weapon_type: WeaponType.Melee, source: "",
    source_type: SourceStatus.Unknown, range: "Close Combat",
    strength: "As weapon",
    special_rules: []
  },
  {
    name: "Halberd",
    description: "The halberd's heavy blade is mounted upon a sturdy shaft of oak or steel and has a point like a spear and a cutting edge like an axe. Since it can be used to chop as well as thrust, it is an adaptable weapon, but is difficult to use inside buildings.",
    availability: [{ id: usable_ids.pop()!, rarity: 0, restrictions: [] }], price: "10",
    weapon_type: WeaponType.Melee, source: "",
    source_type: SourceStatus.Unknown, range: "Close Combat",
    strength: "As user +1",
    special_rules: [special_rules[7].id!]
  },
  {
    name: "Hammer, Staff, Mace or Club.",
    description: "Perhaps the simplest type of weapon, these brutal, bludgeoning instruments range from primitive wooden clubs to elaborately forged Dwarf hammers made from the finest steel. A blow from a mace can easily crush a skull or knock a man unconscious.",
    availability: [{ id: usable_ids.pop()!, rarity: 0, restrictions: [] }], price: "3",
    weapon_type: WeaponType.Melee, source: "",
    source_type: SourceStatus.Unknown, range: "Close Combat",
    strength: "As user",
    special_rules: [special_rules[28].id!]
  },
  {
    name: "Horseman's Hammer",
    description: "This is a great hammer similar to the ones used by the Knights of the White Wolf. Far too bulky to use in one hand, a horseman's hammer is best suited to mounted combat, when the impetus of the horse may be used to add to the power of the weapon.",
    availability: [{ id: usable_ids.pop()!, rarity: 10, restrictions: [] }], price: "12",
    weapon_type: WeaponType.Melee, source: "",
    source_type: SourceStatus.Unknown, range: "Close Combat",
    strength: "As user +1",
    special_rules: [special_rules[7].id!, special_rules[29].id!]
  },
  {
    name: "Ithilmar Weapon",
    description: "Elven blades are forged from priceless Ithilmar, an extremely light but strong metal, found only in the fabled Elven kingdoms. A few of these weapons are occasionally found in the Old World and these are normally spoils of war, taken by the Norse raiders who pillage the coastal settlements of the Elves.An Ithilmar weapon gives its user +1 Initiative in hand-to-hand combat, and costs three times the price of a normal weapon of its kind. You may choose which hand-to-hand weapon is offered to you as explained in the Trading section.",
    availability: [{ id: usable_ids.pop()!, rarity: 9, restrictions: [] }], price: "As weapon x3",
    weapon_type: WeaponType.Melee, source: "",
    source_type: SourceStatus.Unknown, range: "Close Combat",
    strength: "As weapon",
    special_rules: []
  },
  {
    name: "Kraken-Tooth Sword",
    description: "A Kraken-Tooth Sword bites clean through armour, bone and heavy armour. Even the most resistant of victims cannot withstand the sawing attacks of its razor-sharp edge.",
    availability: [{ id: usable_ids.pop()!, rarity: 15, restrictions: [] }], price: "165",
    weapon_type: WeaponType.Melee, source: "",
    source_type: SourceStatus.Unknown, range: "Close Combat",
    strength: "As User",
    special_rules: [special_rules[9].id!, special_rules[31].id!]
  },
  {
    name: "Lance",
    description: "Lances are long, heavy spears used by mounted shock troops to rip through armour and fling their foes to the ground. They are the chosen weapons of Knights Templar and other wealthy warriors. To use a lance requires great skill and strength, and only the richest warriors ride the heavy warhorses needed to wield these mighty weapons effectively.",
    availability: [{ id: usable_ids.pop()!, rarity: 8, restrictions: [] }], price: "40",
    weapon_type: WeaponType.Melee, source: "",
    source_type: SourceStatus.Unknown, range: "Close Combat",
    strength: "As user +2",
    special_rules: [special_rules[32].id!, special_rules[33].id!]
  },
  {
    name: "Maul",
    description: "A massive, double-handed hammer or mace, the Maul is oft a head weighing fifty pounds or more, supported by a big thick oak or metal staff.",
    availability: [{ id: usable_ids.pop()!, rarity: 8, restrictions: [{ restriction_type: RestrictionType.Warband, restriction: "Crazy Grom's Mercs for Hire" }] }], price: "20",
    weapon_type: WeaponType.Melee, source: "",
    source_type: SourceStatus.Unknown, range: "Close Combat",
    strength: "As User +2",
    special_rules: [special_rules[4].id!, special_rules[25].id!, special_rules[34].id!]
  },
  {
    name: "Morning Star",
    description: "A morning star consists of a wooden or steel shaft with heavy chains that have spiked steel balls attached. It is very destructive and requires great skill to wield effectively.",
    availability: [{ id: usable_ids.pop()!, rarity: 0, restrictions: [] }], price: "15",
    weapon_type: WeaponType.Melee, source: "",
    source_type: SourceStatus.Unknown, range: "Close Combat",
    strength: "As user +1",
    special_rules: [special_rules[13].id!, special_rules[35].id!]
  },
  {
    name: "Obsidian Weapon",
    description: "(Marauders of Chaos, Norse, Beastmen, Chaos Dwarves, Possessed and Carnival of Chaos only)Obsidian is mined in the Dark Lands by the minions of Chaos. When expertly derived from its ore, the curious volcanic rock becomes ensorcelled by engineers manufacturing artefacts in the furnaces of Zharr-Naggrund. Forging weapons using these vile techniques requires acute diabolic expertise, making them extremely rare.An obsidian weapon gives its user +1 Strength in hand-to-hand combat, and costs four times the price of a normal weapon of its kind. You may choose which type of hand-to-hand is offered to you.",
    availability: [{ id: usable_ids.pop()!, rarity: 12, restrictions: [] }], price: "As weapon x4",
    weapon_type: WeaponType.Melee, source: "",
    source_type: SourceStatus.Unknown, range: "Close combat",
    strength: "+1",
    special_rules: [special_rules[36].id!, special_rules[13].id!]
  },
  {
    name: "Scythe",
    description: "Scythes are normally implements used in the fields by farmers. It is rare to see them wielded as weapons of warfare. However, the scythe also carries with it an image of death. It is the symbol of the Grim Reaper, the representation of famine, starvation and disease through the lack of harvested food.Priests of Morr, when they need to, may carry a scythe as a weapon. This is of heavier manufacture, and designed to reap warriors rather than wheat.Because the Scythe is unwieldy, it must be used with two-hands and cannot be used with another weapon, shield or buckler.",
    availability: [{ id: usable_ids.pop()!, rarity: 0, restrictions: [] }], price: "10",
    weapon_type: WeaponType.Melee, source: "",
    source_type: SourceStatus.Unknown, range: "Close Combat",
    strength: "As user +1",
    special_rules: []
  },
  {
    name: "Sigmarite Warhammer",
    description: "One of the traditional weapons of the Sisterhood, the Warhammer echoes Ghal-Maraz, the great hammer of Sigmar himself.",
    availability: [{ id: usable_ids.pop()!, rarity: 0, restrictions: [{ restriction_type: RestrictionType.Warband, restriction: "Sisters of Sigmar" }] }], price: "15",
    weapon_type: WeaponType.Melee, source: "",
    source_type: SourceStatus.Unknown, range: "Close Combat",
    strength: "As User +1",
    special_rules: [special_rules[28].id!, special_rules[37].id!]
  },
  {
    name: "Silver-tipped Stake",
    description: "Silver has a devastating effect on Vampires. It's mere touch can cause excruciating pain and anguish.",
    availability: [{ id: usable_ids.pop()!, rarity: 0, restrictions: [{ restriction_type: RestrictionType.Warband, restriction: "Vampire Hunters" }] }], price: "15",
    weapon_type: WeaponType.Melee, source: "",
    source_type: SourceStatus.Unknown, range: "Close Combat",
    strength: "As User",
    special_rules: [special_rules[38].id!]
  },
  {
    name: "Spear",
    description: "Spears range from sharpened sticks used by Goblins to the impressive cavalry spears typical of the Elves.",
    availability: [{ id: usable_ids.pop()!, rarity: 0, restrictions: [] }], price: "10",
    weapon_type: WeaponType.Melee, source: "",
    source_type: SourceStatus.Unknown, range: "Close Combat",
    strength: "As user",
    special_rules: [special_rules[39].id!, special_rules[40].id!, special_rules[33].id!]
  },
  {
    name: "Spiked Gauntlet",
    description: "Spiked Gauntlets are all too common in the fighting pits of the old world. Used by some of the most savage pit fighters, spiked gauntlets are always used in pairs and, while cumbersome to use in a straight fight, their vicious spikes and barbscan cause crippling injuries to an opponent with a single, well-landed punch.",
    availability: [{ id: usable_ids.pop()!, rarity: 6, restrictions: [{ restriction_type: RestrictionType.Warband, restriction: "Pit Fighters" }] }], price: "15",
    weapon_type: WeaponType.Melee, source: "",
    source_type: SourceStatus.Unknown, range: "Close Combat",
    strength: "As User",
    special_rules: [special_rules[5].id!, special_rules[6].id!]
  },
  {
    name: "Squig Prodder",
    description: "This item is a long pole with a trio of spikes at the end. It is used by Goblin Squig herders to keep their livestock in line. Cave Squigs will recognize a Squig prodder and automatically give the bearer more respect, as they've all been on its pointy end more than once! To represent this, a Goblin with a Squig prodder can keep all Cave Squigs within 12\" from going wild, instead of the normal 6\" (see the Minderz special rule under the Cave Squig entry). In addition, a Squig prodder is treated exactly like a spear in hand-to-hand combat.",
    availability: [{ id: usable_ids.pop()!, rarity: 0, restrictions: [{ restriction_type: RestrictionType.WarbandGroup, restriction: "Goblins" }] }], price: "15",
    weapon_type: WeaponType.Melee, source: "",
    source_type: SourceStatus.Unknown, range: "Close Combat",
    strength: "As User",
    special_rules: []
  },
  {
    name: "Staffsword",
    description: "Believed to be out of the Far East, the Staffsword is little more than an incredibly long blade with an extended hilt in the middle.",
    availability: [{ id: usable_ids.pop()!, rarity: 9, restrictions: [{ restriction_type: RestrictionType.Warband, restriction: "Crazy Grom's Mercs for Hire" }] }], price: "25",
    weapon_type: WeaponType.Melee, source: "",
    source_type: SourceStatus.Unknown, range: "Close Combat",
    strength: "As User",
    special_rules: [special_rules[4].id!, special_rules[41].id!, special_rules[42].id!]
  },
  {
    name: "Steel Whip",
    description: "Sister of SigmarAnother weapon unique to the Sisterhood is the steel whip, made from barbed steel chains.",
    availability: [{ id: usable_ids.pop()!, rarity: 0, restrictions: [{ restriction_type: RestrictionType.Warband, restriction: "Sisters of Sigmar" }] }], price: "10",
    weapon_type: WeaponType.Melee, source: "",
    source_type: SourceStatus.Unknown, range: "Close combat",
    strength: "As User.",
    special_rules: [special_rules[43].id!, special_rules[44].id!]
  },
  {
    name: "Sword Breaker",
    description: "The sword breaker is a specialist weapon wrought by only the most talented sword smiths. Next to the hilt are two prongs concealed within the blade that can be used to trap an opponent's blade, twisting and snapping it with a single, well time movement.",
    availability: [{ id: usable_ids.pop()!, rarity: 8, restrictions: [] }], price: "30",
    weapon_type: WeaponType.Melee, source: "",
    source_type: SourceStatus.Unknown, range: "Close combat",
    strength: "As user",
    special_rules: [special_rules[9].id!, special_rules[45].id!]
  },
  {
    name: "Trident",
    description: "The Trident, as a Pit Fighter weapon, originates in Tilea from the ancient days when gladiators, as the Tileans called them, would fight in the massive public arenas. This weapon is similar to a spear and has all of its advantages in length but it has three spear points allowing an adept user to catch blades between them and turn them aside.Traditionally, the Trident is a weapon that is combined with a net and used by a lightly armoured Pit Fighter against the more heavily armed swordsmen.",
    availability: [{ id: usable_ids.pop()!, rarity: 7, restrictions: [{ restriction_type: RestrictionType.Warband, restriction: "Pit Fighters" }] }], price: "15",
    weapon_type: WeaponType.Melee, source: "",
    source_type: SourceStatus.Unknown, range: "Close combat",
    strength: "As User",
    special_rules: [special_rules[39].id!, special_rules[9].id!]
  },
  {
    name: "Veteran's Hand",
    description: "Formed of two or more metal pincers controlled through wires, straps and weights. This expensive prosthetic allows the user to grip and pick up certain objects. These marvels of engineering are made to measure by master craftsmen. Though some are temperamental and rusting, others are exquisite, jewelled and gilded creations sometimes worth more than the person sporting them.",
    availability: [{ id: usable_ids.pop()!, rarity: 12, restrictions: [] }], price: "85",
    weapon_type: WeaponType.Melee, source: "",
    source_type: SourceStatus.Unknown, range: "Close Combat",
    strength: "As User +1.",
    special_rules: [special_rules[9].id!, special_rules[46].id!, special_rules[47].id!]
  },
  {
    name: "Wizard's Staff",
    description: "Many Wizards find the use of a staff both practical for their long journeys and defend them when the use of their magical arts will draw suspicion.",
    availability: [{ id: usable_ids.pop()!, rarity: 0, restrictions: [{ restriction_type: RestrictionType.Warband, restriction: "Sorcerous Society" }] }], price: "10",
    weapon_type: WeaponType.Melee, source: "",
    source_type: SourceStatus.Unknown, range: "Close Combat",
    strength: "As User",
    special_rules: [special_rules[9].id!, special_rules[4].id!, special_rules[28].id!]
  },
].map((item) => {
  return {
    ...item,
    id: usable_ids.pop()!,
    item_type: ItemType.Weapon,
    source: "",
    source_type: SourceStatus.Unknown,
    weapon_type: WeaponType.Melee,
  };
});

let ranged_weapons: Weapon[] = [
  {
    name: "Blessed Bolts",
    description: "Blessed by the Warrior Priest and his Acolytes, the Blessed Bolts may be fired against the enemies of Sigmar.",
    availability: [{ id: usable_ids.pop()!, rarity: 0, restrictions: [{ restriction_type: RestrictionType.Warband, restriction: "Sisters of Sigmar" }] }], price: "25",
    weapon_type: WeaponType.Ranged, source: "",
    source_type: SourceStatus.Unknown, range: "As Weapon",
    strength: "As Weapon",
    special_rules: [special_rules[54].id!]
  },
  {
    name: "Blowpipe",
    description: "The blowpipe is a short hollow tube which can be used to shoot poisoned darts. While the darts by themselves are too small to cause significant damage, the poison used by the Skaven can cause searing agony and eventual death. The other advantage of a blowpipe is that it is silent, and a well-hidden shooter can fire the darts undetected.",
    availability: [{
      id: usable_ids.pop()!, rarity: 7, restrictions: [
        { restriction_type: RestrictionType.WarbandGroup, restriction: "Skaven" },
        { restriction_type: RestrictionType.WarbandGroup, restriction: "Lizardmen" },
        { restriction_type: RestrictionType.Warband, restriction: "Forest Goblins" },
      ]
    }], price: "25",
    weapon_type: WeaponType.Ranged, source: "",
    source_type: SourceStatus.Unknown, range: "8\"",
    strength: "1",
    special_rules: [special_rules[55].id!, special_rules[56].id!, special_rules[57].id!]
  },
  {
    name: "Bolas",
    description: "Bolas are a set of three bronze balls on strings tied together. They are thrown similar to a sling and are rotated around the head for speed. The Bolas is a hunting weapon and doesn't harm the animal. It immobilises it and allows the hunter to either subdue it or put it out with his spear. The Bolas has a range of 16\" and can only be used once per battle. They are automatically recovered after each battle.",
    availability: [{ id: usable_ids.pop()!, rarity: 0, restrictions: [{ restriction_type: RestrictionType.WarbandGroup, restriction: "Lustria" }] }], price: "5",
    weapon_type: WeaponType.Ranged, source: "",
    source_type: SourceStatus.Unknown, range: "16\"",
    strength: "See 'Special Rules'.",
    special_rules: [special_rules[58].id!, special_rules[59].id!]
  },
  {
    name: "Bow",
    description: "The bow is carried by most races and used extensively in warfare. It is a compact yet powerful weapon, that is cheap to make and easy to maintain.",
    availability: [{ id: usable_ids.pop()!, rarity: 0, restrictions: [] }], price: "10",
    weapon_type: WeaponType.Ranged, source: "",
    source_type: SourceStatus.Unknown, range: "24\"",
    strength: "3",
    special_rules: []
  },
  {
    name: "Cathayan Candles",
    description: "Cathayan Candles are explosive pots or sticks, made with black powder and other foreign ingredients. These volatile Bombas, as peddled by Arabyan dealers, 'usually' detonate on impact, igniting objects and bodies with which they make contact.",
    availability: [{ id: usable_ids.pop()!, rarity: 9, restrictions: [] }], price: "25 +D6",
    weapon_type: WeaponType.Ranged, source: "",
    source_type: SourceStatus.Unknown, range: "6\"",
    strength: "6",
    special_rules: [special_rules[60].id!, special_rules[61].id!, special_rules[62].id!]
  },
  {
    name: "Crossbow",
    description: "A crossbow consists of a short, strong bow-stave mounted on a wooden or steel stock. The crossbows of the Empire are made of steel and often include a winding mechanism to draw back the string. It takes a long time to prepare a crossbow, but a bolt fired from one has a tremendous range and can penetrate armour easily. Crossbows take much longer than other bows to make, so they are expensive and relatively rare weapons. Still, they are the preferred weapon of many in Mordheim because of their power and long range.Special Rule: -Move or Fire: You may not move and fire a crossbow on the same turn, other than to pivot on the spot to face your target or to stand up.",
    availability: [{ id: usable_ids.pop()!, rarity: 0, restrictions: [] }], price: "25",
    weapon_type: WeaponType.Ranged, source: "",
    source_type: SourceStatus.Unknown, range: "30\"",
    strength: "4",
    special_rules: []
  },
  {
    name: "Crossbow Pistol",
    description: "Crossbow pistols are masterpieces made by expert weapon-smiths. They are miniature crossbows with all the power and accuracy of the real thing. As these weapons may be easily concealed, they are the favoured weapon of assassins.",
    availability: [{ id: usable_ids.pop()!, rarity: 9, restrictions: [] }], price: "35",
    weapon_type: WeaponType.Ranged, source: "",
    source_type: SourceStatus.Unknown, range: "10\"",
    strength: "4",
    special_rules: [special_rules[63].id!]
  },
  {
    name: "Elf Bow",
    description: "Elven bows are the finest missile weapons of their kind. Constructed from Ithilmar or wood from the Elf forests, with strings woven from the hair of Elf maidens, Elven bows are far superior to any missile weapons made by other races. In the hands of an Elven archer, the Elf bow is a truly potent weapon, its long range and penetrating power making it far superior to any bow made by humans.",
    availability: [{ id: usable_ids.pop()!, rarity: 12, restrictions: [] }], price: "35+3D6",
    weapon_type: WeaponType.Ranged, source: "",
    source_type: SourceStatus.Unknown, range: "36\"",
    strength: "3",
    special_rules: [special_rules[64].id!]
  },
  {
    name: "Hunter's Throwing Axe",
    description: "Huntsmen stalk the unbridled wilds surrounding cities of the Empire skinning foes. A throwing axe procured from one such dark wanderer is a fine quality implement.",
    availability: [{ id: usable_ids.pop()!, rarity: 10, restrictions: [] }], price: "30",
    weapon_type: WeaponType.Ranged, source: "",
    source_type: SourceStatus.Unknown, range: "6\"",
    strength: "As User +1",
    special_rules: [special_rules[69].id!]
  },
  {
    name: "Javelins",
    description: "Javelins are short throwing spears specially weighted to travel quite a distance. Although they have a much-reducedrange when compared to an arrow they can cause quite considerable damage when thrown by a person of great strength.",
    availability: [{ id: usable_ids.pop()!, rarity: 0, restrictions: [{ restriction_type: RestrictionType.Warband, restriction: "Norse Explorers" }] }], price: "5",
    weapon_type: WeaponType.Ranged, source: "",
    source_type: SourceStatus.Unknown, range: "8\"",
    strength: "As User",
    special_rules: [special_rules[69].id!]
  },
  {
    name: "Long Bow",
    description: "A long bow is made of alternating layers of either yew or elm. A skilled archer can hit a chosen leaf on a tree from three hundred paces with this weapon. The long bow is favoured by experienced archers due to its great reach and accuracy.",
    availability: [{ id: usable_ids.pop()!, rarity: 0, restrictions: [] }], price: "15",
    weapon_type: WeaponType.Ranged, source: "",
    source_type: SourceStatus.Unknown, range: "30\"",
    strength: "3",
    special_rules: []
  },
  {
    name: "Magnin Throwing Knives",
    description: "A Magnin knife is a master-crafted version of a throwing knife. Each a fine piece of workmanship, with an eighteen-inch blade honed to a razor's edge. A thing of smooth curves and sharp lines. It is not for show.",
    availability: [{ id: usable_ids.pop()!, rarity: 11, restrictions: [] }], price: "45",
    weapon_type: WeaponType.Ranged, source: "",
    source_type: SourceStatus.Unknown, range: "8\"",
    strength: "As User",
    special_rules: [special_rules[69].id!, special_rules[70].id!]
  },
  {
    name: "Repeater Crossbow",
    description: "Repeater crossbows are extremely complex devices, expensive to acquire and difficult to make. While this makes them rare, they certainly have their uses: they can rain a deadly hail of bolts on enemies, and a warrior using one may move quite fast and still fire his weapon.",
    availability: [{ id: usable_ids.pop()!, rarity: 8, restrictions: [] }], price: "40",
    weapon_type: WeaponType.Ranged, source: "",
    source_type: SourceStatus.Unknown, range: "24\"",
    strength: "3",
    special_rules: [special_rules[71].id!]
  },
  {
    name: "Short Bow",
    description: "Short bows are small, short-ranged bows that are cheap and require little strength to use. Some cavalry carry a shortened bow which is easier to shoot from horseback than a larger bow. Halflings also use short bows, as they lack the strength and height required to use a long bow.",
    availability: [{ id: usable_ids.pop()!, rarity: 0, restrictions: [] }], price: "5",
    weapon_type: WeaponType.Ranged, source: "",
    source_type: SourceStatus.Unknown, range: "16\"",
    strength: "3",
    special_rules: []
  },
  {
    name: "Sling",
    description: "Slings are rarely used, mainly because they are no more powerful than bows and have a shorter range. A sling is little more than a looped strip of cloth or leather into which a stone is placed. The sling is whirled about the slinger's head and the sling stone is then released towards the target. While this weapon is looked down upon by most archers, a skilled slinger can slay a man from a considerable distance, and the ammunition is easy to find: rocks are everywhere and free!Special Rule: -Fire Twice at Half Range: A slinger may fire twice in the shooting phase if he does not move in the movement phase. He cannot shoot over half range (9\") though, if he fires twice. If the model fires twice then each shot is at -1 to hit.",
    availability: [{ id: usable_ids.pop()!, rarity: 0, restrictions: [] }], price: "2",
    weapon_type: WeaponType.Ranged, source: "",
    source_type: SourceStatus.Unknown, range: "18\"",
    strength: "3",
    special_rules: []
  },
  {
    name: "Sun Gauntlet",
    description: "This, as with all strange arcane Amazon items, is made from an unknown multi-coloured metal that is impervious to damage or corrosion. It is covered in strange runes and a bright gemstone is set into the hilt. In many ways this weapon resembles a black powder pistol. It can be held in one hand and when pointed at an enemy unleashes a blinding beam of energy like the Sunstaff.",
    availability: [{ id: usable_ids.pop()!, rarity: 12, restrictions: [{ restriction_type: RestrictionType.Warband, restriction: "Amazons" }] }], price: "40",
    weapon_type: WeaponType.Ranged, source: "",
    source_type: SourceStatus.Unknown, range: "12\"",
    strength: "4",
    special_rules: [special_rules[72].id!, special_rules[19].id!, special_rules[73].id!]
  },
  {
    name: "Sunstaff",
    description: "The Sunstaff is a long tubular stick that is made from a strange multi-coloured metal with one end hollow like a tube. Strange runes are carved along its length and a large gemstone is set into the pommel. Despite being extremely ancient (Elf Lore Masters of the White Tower of Hoeth claim to have found a similar device that they surmise is more than 20,000 years old - older than the Elven race itself!), the wielder of the Sunstaff can discharge a beam of energy akin to the rays of the sun.",
    availability: [{ id: usable_ids.pop()!, rarity: 12, restrictions: [{ restriction_type: RestrictionType.Warband, restriction: "Amazons" }] }], price: "50",
    weapon_type: WeaponType.Ranged, source: "",
    source_type: SourceStatus.Unknown, range: "24\"",
    strength: "4",
    special_rules: [special_rules[72].id!, special_rules[19].id!]
  },
  {
    name: "Throwing Stars/Knives/Axes",
    description: "Throwing stars are used mainly by the assassins of the sinister House of Shadows, or by street thugs who specialize in ambushing the unwary. A perfectly balanced knife thrown from behind has ended the life of many a noble and merchant in Mordheim. Throwing knives are not suitable for close combat, as their balance makes them unwieldy in close quarters.",
    availability: [{ id: usable_ids.pop()!, rarity: 5, restrictions: [{ restriction_type: RestrictionType.Warband, restriction: "Norse Explorers" }] }], price: "15",
    weapon_type: WeaponType.Ranged, source: "",
    source_type: SourceStatus.Unknown, range: "6\"",
    strength: "As user.",
    special_rules: [special_rules[69].id!]
  },
].map((item) => {
  return {
    ...item,
    id: usable_ids.pop()!,
    item_type: ItemType.Weapon,
    favourite: false,
    source: "",
    source_type: SourceStatus.Unknown,
    weapon_type: WeaponType.Ranged,
  };
});

let blackpowder_weapons: Weapon[] = [
  {
    name: "Blunderbuss",
    description: "A blunderbuss is a primitive black powder weapon, which fires a hail of lead balls, rusty bolts, bent nails, and other assorted scrap metal. It is a powerful, if erratic, weapon and takes such a long time to load that most warriors discard it after the first shot.",
    availability: [{ id: usable_ids.pop()!, rarity: 9, restrictions: [] }], price: "30",
    weapon_type: WeaponType.Blackpowder, source: "",
    source_type: SourceStatus.Unknown, range: "Special",
    strength: "3",
    special_rules: [special_rules[76].id!, special_rules[77].id!]
  },
  {
    name: "Cathayan Candle",
    description: "Cathayan Candles are explosive pots or sticks, made with black powder and other foreign ingredients. These volatile \"Bombas\" as peddled by Arabyan dealers",
    availability: [{ id: usable_ids.pop()!, rarity: 9, restrictions: [] }], price: "25+1D6",
    weapon_type: WeaponType.Blackpowder, source: "",
    source_type: SourceStatus.Unknown, range: "6\"",
    strength: "6",
    special_rules: [special_rules[60].id!, special_rules[78].id!, special_rules[61].id!]
  },
  {
    name: "Cinderblast Bomb",
    description: "",
    availability: [{ id: usable_ids.pop()!, rarity: 10, restrictions: [{ restriction_type: RestrictionType.Unit, restriction: "Dwarf Engineers - Dwarf" }] }], price: "45+3D6",
    weapon_type: WeaponType.Blackpowder, source: "",
    source_type: SourceStatus.Unknown, range: "2\"-8\"",
    strength: "6 (exactly hit), 3 in area of effect",
    special_rules: [special_rules[79].id!, special_rules[80].id!]
  },
  {
    name: "Double-Barrelled Handgun",
    description: "Created from a request by a Nuln nobleman who had been impressed by a demonstration model, the gunsmiths slaved long and hard to replicate it until a final model was forged. By then the noble had forgotten about it and the Colleges was left with a job lot. These were given to the Gunnery School as a gift and sort of disappeared on route.",
    availability: [{ id: usable_ids.pop()!, rarity: 10, restrictions: [{ restriction_type: RestrictionType.Warband, restriction: "Nuln" }] }], price: "60 + 2D6",
    weapon_type: WeaponType.Blackpowder, source: "",
    source_type: SourceStatus.Unknown, range: "24\"",
    strength: "4",
    special_rules: [special_rules[66].id!, special_rules[65].id!, special_rules[67].id!, special_rules[82].id!, special_rules[83].id!]
  },
  {
    name: "Double-Barreled Blunderbuss",
    description: "A fancy invention that saves a pirate time for reloading, and possibly saving his life in the meantime. The inside is filled from any and all kinds of ammo, from silver rounds for fighting evil spirits to plain rocks from the ground.",
    availability: [{ id: usable_ids.pop()!, rarity: 11, restrictions: [] }], price: "60",
    weapon_type: WeaponType.Blackpowder, source: "",
    source_type: SourceStatus.Unknown, range: "Special",
    strength: "3",
    special_rules: [special_rules[76].id!, special_rules[71].id!]
  },
  {
    name: "Double-barreled Hunting Rifle",
    description: "Knowing Ostlanders' penchant for impressive weaponry (and ready willingness to spend excessive amounts of money) a Weaponsmith from Hochland decided to weld two barrels together on a pistol and sell it for twice the price. The Warband was so impressed with their new weapon that they asked him to do the same to their hunting rifle. Since then the Weaponsmith has been flooded with orders from some of the most powerful Warbands in Mordheim.",
    availability: [{ id: usable_ids.pop()!, rarity: 12, restrictions: [] }], price: "250",
    weapon_type: WeaponType.Blackpowder, source: "",
    source_type: SourceStatus.Unknown, range: "48\"",
    strength: "4",
    special_rules: [special_rules[66].id!, special_rules[65].id!, special_rules[67].id!, special_rules[82].id!, special_rules[83].id!, special_rules[84].id!]
  },
  {
    name: "Double-barrelled Pistol / brace",
    description: "Knowing Ostlanders' penchant for impressive weaponry (and ready willingness to spend excessive amounts of money) a Weaponsmith from Hochland decided to weld two barrels together on a pistol and sell it for twice the price. The Warband was so impressed with their new weapon that they asked him to do the same to their hunting rifle. Since then the Weaponsmith has been flooded with orders from some of the most powerful Warbands in Mordheim.",
    availability: [{ id: usable_ids.pop()!, rarity: 10, restrictions: [] }], price: "30/60",
    weapon_type: WeaponType.Blackpowder, source: "",
    source_type: SourceStatus.Unknown, range: "6\"",
    strength: "4",
    special_rules: [special_rules[66].id!, special_rules[67].id!, special_rules[73].id!, special_rules[82].id!, special_rules[83].id!]
  },
  {
    name: "Duck-Footed Pistol",
    description: "A peculiar and often custom-made weapon, the Duck-footed pistol is a many-chambered gun that fires multiple shots simultaneously... the barrels are splayed outwards, to the resulting deadly weapon resembles the comical footprint of wading birds.",
    availability: [{ id: usable_ids.pop()!, rarity: 11, restrictions: [] }], price: "50",
    weapon_type: WeaponType.Blackpowder, source: "",
    source_type: SourceStatus.Unknown, range: "10\"",
    strength: "3",
    special_rules: [special_rules[85].id!, special_rules[86].id!, special_rules[73].id!, special_rules[87].id!, special_rules[88].id!]
  },
  {
    name: "Duelling Pistol/Brace",
    description: "A duelling pistol is a work of art, and a gunsmith labours long and hard to produce a single example. They are often carried by Imperial nobles to solve disputes over love and honour, and many a noble has died at dawn in a duel over some grievance. Duelling pistols are prohibitively expensive weapons and common warriors rarely have them. Even if they do manage to steal or buy one, the ammunition is prohibitively expensive. Some of the wealthiest warriors in Mordheim carry duelling pistols as status symbols, commanding great respect, admiration and envy.",
    availability: [{ id: usable_ids.pop()!, rarity: 10, restrictions: [] }], price: "30/60",
    weapon_type: WeaponType.Blackpowder, source: "",
    source_type: SourceStatus.Unknown, range: "10\"",
    strength: "4",
    special_rules: [special_rules[81].id!, special_rules[66].id!, special_rules[67].id!, special_rules[73].id!]
  },
  {
    name: "Handgun",
    description: "A handgun is a simple firearm. The quality of construction varies ranging from the crude wooden 'hakbuts' of the artillery school of Nuln, to the more sophisticated Dwarf firearms that have levers and springs which hold the burning match, and triggers which release the firing mechanism and fire the gun. Handguns are not terribly reliable weapons: the gun barrel occasionally tends to explode violently or the powder fails to ignite. But the weapon has a great range and tremendous penetrating power, making a mockery of even the thickest armour. In Mordheim, handguns are rare and expensive, but a warband which can boast such a weapon will command respect from all its rivals.",
    availability: [{ id: usable_ids.pop()!, rarity: 8, restrictions: [] }], price: "35",
    weapon_type: WeaponType.Blackpowder, source: "",
    source_type: SourceStatus.Unknown, range: "24\"",
    strength: "4",
    special_rules: [special_rules[66].id!, special_rules[65].id!, special_rules[67].id!]
  },
  {
    name: "Hochland Long Rifle (or Hunting Rifle)",
    description: "Hochland is a province famed for its hunters, and the preferred weapon of its nobility when they go hunting is a long-ranged rifle. They are extremely rare and precious weapons, and only the most experienced weapon smiths are capable of manufacturing them.",
    availability: [{ id: usable_ids.pop()!, rarity: 11, restrictions: [] }], price: "200",
    weapon_type: WeaponType.Blackpowder, source: "",
    source_type: SourceStatus.Unknown, range: "48\"",
    strength: "4",
    special_rules: [special_rules[65].id!, special_rules[66].id!, special_rules[89].id!, special_rules[67].id!]
  },
  {
    name: "Long Barreled Pistol",
    description: "More of a small musket than a pistol, the weapon has incredible range and accuracy, making it a well sought out weapon (and a status symbol) for any pirate captain.",
    availability: [{ id: usable_ids.pop()!, rarity: 10, restrictions: [] }], price: "40/80",
    weapon_type: WeaponType.Blackpowder, source: "",
    source_type: SourceStatus.Unknown, range: "16\"",
    strength: "4",
    special_rules: [special_rules[90].id!, special_rules[67].id!, special_rules[91].id!, special_rules[92].id!]
  },
  {
    name: "Pistol/brace",
    description: "pistol is a small, simple black powder weapon fired by a spring mechanism. Most pistols are expensive, unreliable, and poorly constructed.",
    availability: [{ id: usable_ids.pop()!, rarity: 8, restrictions: [] }], price: "15/30",
    weapon_type: WeaponType.Blackpowder, source: "",
    source_type: SourceStatus.Unknown, range: "6\"",
    strength: "4",
    special_rules: [special_rules[66].id!, special_rules[67].id!, special_rules[73].id!]
  },
  {
    name: "Pocket Pistol",
    description: "A tiny one-barreled weapon, that can easily be concealed in a sleeve, hat, boot, or anywhere else. It's not much use in the middle of a fight, but has been known to get people OUT of them.",
    availability: [{ id: usable_ids.pop()!, rarity: 4, restrictions: [] }], price: "5",
    weapon_type: WeaponType.Blackpowder, source: "",
    source_type: SourceStatus.Unknown, range: "4\"",
    strength: "4",
    special_rules: []
  },
  {
    name: "Sword-Pistol",
    description: "The Bretonnian pirate Ronald Blackhand liked engineering, and he liked blackpowder weapons, but he also had a love for tales of ancient Knights battling good and evil with swords and shields, and thus he invented the Sword-pistol! A sword incorporating a pistol quickly gained renown among the Ostlanders and some of the Tileans, however to the  resent date these weapons are still very rare.",
    availability: [{ id: usable_ids.pop()!, rarity: 10, restrictions: [{ restriction_type: RestrictionType.WarbandGroup, restriction: "Pirates" }] }], price: "40",
    weapon_type: WeaponType.Blackpowder, source: "",
    source_type: SourceStatus.Unknown, range: "10\" / Close Combat",
    strength: "4 / As user",
    special_rules: [special_rules[95].id!, special_rules[96].id!, special_rules[9].id!, special_rules[81].id!, special_rules[66].id!, special_rules[97].id!, special_rules[73].id!, special_rules[98].id!]
  },
  {
    name: "Tufenk ",
    description: "This is a blowpipe that projects alchemical fire about eight feet causing burning damage.",
    availability: [{ id: usable_ids.pop()!, rarity: 10, restrictions: [{ restriction_type: RestrictionType.Setting, restriction: "Khemri" }] }], price: "15",
    weapon_type: WeaponType.Blackpowder, source: "",
    source_type: SourceStatus.Unknown, range: "8\"",
    strength: "2",
    special_rules: [special_rules[8].id!]
  },
  {
    name: "Warplock Pistol/brace",
    description: "Warplock pistols are terrifying weapons, testimony to the mad genius of Clan Skryre engineers. Warplock pistols shoot ammunition made of magically treated warpstone and wounds caused by Warplock pistols are horrible to behold and often cause infections. ",
    availability: [{ id: usable_ids.pop()!, rarity: 11, restrictions: [{ restriction_type: RestrictionType.WarbandGroup, restriction: "Skaven" }] }],
    price: "35/70",
    range: "8",
    strength: "5",
    special_rules: [special_rules[66].id!, special_rules[67].id!, special_rules[73].id!]
  },
].map((item) => {
  return {
    ...item,
    id: usable_ids.pop()!,
    item_type: ItemType.Weapon,
    favourite: false,
    source: "",
    source_type: SourceStatus.Unknown,
    weapon_type: WeaponType.Blackpowder,
  };
});

export const initialSpecialRuleState: SpecialRule[] = special_rules;
export const initialWeaponState: Weapon[] = [...melee_weapons, ...ranged_weapons, ...blackpowder_weapons];
