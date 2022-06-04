import React, { useEffect, useState } from "react";
import MenuLogged from "pages/structure/MenuLogged";
import useSession from "pages/customHooks/useSession";
import Content from "pages/structure/LayoutContent";
import SearchInput from "pages/atoms/Inputs/Search";
import styles from "./index.module.scss";
import Button from "pages/atoms/Button";
import Link from "next/link";

export default function Dashboard() {
  const { email, userName } = useSession();

  const [sells, setSells] = useState([
    {
      id: "fd966f4d-88ae-4ec9-bbcf-1574cbdc8cb7",
      first_name: "Ermina Amorine",
      soldAt: "17-Nov-2021",
    },
    {
      id: "22e9e8e8-740a-40cf-9b5c-2ed826d3fe4d",
      first_name: "Sybille Hunday",
      soldAt: "27-Jul-2021",
    },
    {
      id: "059cd9c6-d70c-4b56-90ea-8e36bdd04a41",
      first_name: "Ingamar Clowsley",
      soldAt: "25-Nov-2021",
    },
    {
      id: "78353e74-d291-4ed8-9ba0-4777e6305efe",
      first_name: "Kristan Alcide",
      soldAt: "08-Sep-2021",
    },
    {
      id: "962a2c3d-4853-49fe-b6bb-d9a5acbfe7f4",
      first_name: "Anna-maria Grissett",
      soldAt: "25-Mar-2022",
    },
    {
      id: "0840c70b-e84a-4074-96ba-dc51bb0eadc4",
      first_name: "Elita Senn",
      soldAt: "29-May-2022",
    },
    {
      id: "3c4a60d3-2f06-442e-9e5e-b308e5007821",
      first_name: "Emlyn Elstub",
      soldAt: "03-Oct-2021",
    },
    {
      id: "5d5ca3e1-9044-4b2c-91da-c60520cb0c84",
      first_name: "Floria Meriott",
      soldAt: "10-Dec-2021",
    },
    {
      id: "5a39328d-b825-46a3-9af2-bc19f0c7d371",
      first_name: "Althea Cloutt",
      soldAt: "08-Sep-2021",
    },
    {
      id: "04acab9e-fdc9-47a2-97d0-16664ff38c4e",
      first_name: "Kipp Evins",
      soldAt: "03-Dec-2021",
    },
    {
      id: "74a6c4ab-6afc-497f-a4e6-3a7b9828130f",
      first_name: "Glennie Pavlitschek",
      soldAt: "05-Feb-2022",
    },
    {
      id: "3b652baa-d9b3-4b08-948b-38a3c393976b",
      first_name: "Judy Beelby",
      soldAt: "19-Dec-2021",
    },
    {
      id: "7c1ec5d8-fe8c-43ce-a67c-cdbee0845717",
      first_name: "Raeann Novak",
      soldAt: "22-Nov-2021",
    },
    {
      id: "0be27c25-429b-4ba5-81f0-b8abd1cf9851",
      first_name: "Graig Wilks",
      soldAt: "23-Sep-2021",
    },
    {
      id: "4b95fb27-3d0c-4240-be40-f1e2f5314bc0",
      first_name: "Winifred Bourne",
      soldAt: "25-Feb-2022",
    },
    {
      id: "ee2dcd40-d894-4a89-984b-5f57b2b91b7f",
      first_name: "Ignacius Presnell",
      soldAt: "26-Apr-2022",
    },
    {
      id: "41fa248b-97db-457c-81e4-86b192067597",
      first_name: "Griswold Challenor",
      soldAt: "22-Jun-2021",
    },
    {
      id: "c34fb5be-25ce-465d-adf6-e0bb10f21c82",
      first_name: "Nichols Bennen",
      soldAt: "18-Jan-2022",
    },
    {
      id: "0e6fb291-fcbf-40e3-8162-cc0216d9a4df",
      first_name: "Paxton Goney",
      soldAt: "07-Apr-2022",
    },
    {
      id: "8d4db588-63f7-46f9-8142-8b134c5e2474",
      first_name: "Annalee McComiskie",
      soldAt: "13-Feb-2022",
    },
    {
      id: "183ecbb7-b752-4946-adaa-85fe1819cffc",
      first_name: "Forrest Itzchaky",
      soldAt: "08-Dec-2021",
    },
    {
      id: "46774c45-c071-455d-b147-7088ba7b7855",
      first_name: "Geralda Hullins",
      soldAt: "16-Jan-2022",
    },
    {
      id: "d8b16d41-5ab7-4822-862c-2a43b0f4c743",
      first_name: "Nat Chesterton",
      soldAt: "08-Dec-2021",
    },
    {
      id: "a7bd1020-1e1a-4773-8780-c22979a7675a",
      first_name: "Ally Mechi",
      soldAt: "19-Sep-2021",
    },
    {
      id: "d36af9af-cba3-479a-9ae0-7ffd7c51e7c9",
      first_name: "Moyra Noads",
      soldAt: "04-Apr-2022",
    },
    {
      id: "27e9cb51-b594-4272-b231-f05420f6d863",
      first_name: "Moises Veart",
      soldAt: "31-Mar-2022",
    },
    {
      id: "1ba9c65b-15de-469a-8420-102ee8a30f8a",
      first_name: "Stevana Ferrari",
      soldAt: "25-Aug-2021",
    },
    {
      id: "b5423d4a-106e-46d1-a9a6-68ea21497040",
      first_name: "Junette Hoyer",
      soldAt: "01-Apr-2022",
    },
    {
      id: "a9b4987e-29cb-49b9-84c9-b4a43d743fde",
      first_name: "Howie Knoller",
      soldAt: "02-Feb-2022",
    },
    {
      id: "a70472e1-e9cc-405a-897d-b5bfd090091b",
      first_name: "Fitz Franek",
      soldAt: "21-Mar-2022",
    },
    {
      id: "a4d767cf-b2ff-4981-9fb2-b04dda39efde",
      first_name: "Devon Mowle",
      soldAt: "28-Nov-2021",
    },
    {
      id: "d4f136bb-d7b9-4c6d-a304-12fb5a999d20",
      first_name: "Emilio Quene",
      soldAt: "26-Apr-2022",
    },
    {
      id: "2ce2074d-e044-4e94-a3b3-42243f0627b5",
      first_name: "Freedman Hubberstey",
      soldAt: "19-Oct-2021",
    },
    {
      id: "d8ec985b-3bfd-4a2b-a50d-79f4657c0d60",
      first_name: "Dick Cess",
      soldAt: "11-May-2022",
    },
    {
      id: "59569c94-d653-4637-bdd9-c2f47f8e40b4",
      first_name: "Zenia Guesford",
      soldAt: "22-Jun-2021",
    },
    {
      id: "240562cf-8784-4172-905d-c69f90de7043",
      first_name: "Cybill Lillgard",
      soldAt: "25-Apr-2022",
    },
    {
      id: "a8cd6805-d32b-442e-b071-16301519dc7d",
      first_name: "Bell Patten",
      soldAt: "17-Nov-2021",
    },
    {
      id: "bf092f00-1db0-4314-8563-010a1a3c9179",
      first_name: "Garv Bonafant",
      soldAt: "26-Feb-2022",
    },
    {
      id: "6a2fce42-ec8d-48c1-b655-b65096146215",
      first_name: "Armand Coppledike",
      soldAt: "23-Sep-2021",
    },
    {
      id: "e4c8a7f7-c349-4b52-b6b2-7afe869e5842",
      first_name: "Enos Dowsey",
      soldAt: "28-Feb-2022",
    },
    {
      id: "d04f27b1-b252-45bf-a15d-05847a9867d9",
      first_name: "Ezri Donaway",
      soldAt: "15-Oct-2021",
    },
    {
      id: "4a0e355f-0dc3-4906-bcc3-df47528ae774",
      first_name: "Tera Ainger",
      soldAt: "19-Jul-2021",
    },
    {
      id: "e1accffc-0fb1-45db-bcb5-f7687b6965fd",
      first_name: "Karlik Hosburn",
      soldAt: "05-Oct-2021",
    },
    {
      id: "73cacc57-a4f2-4d3c-ad17-5530f54faf4d",
      first_name: "Clari Zorzi",
      soldAt: "25-Dec-2021",
    },
    {
      id: "88de017a-c6ce-4b0b-b93d-e1c6362fd1bd",
      first_name: "Staford Crolly",
      soldAt: "24-Mar-2022",
    },
    {
      id: "5245c788-edb0-4f11-8d32-a20f1eba3f2c",
      first_name: "Rowena McPartling",
      soldAt: "02-Jan-2022",
    },
    {
      id: "fe66e447-b692-4494-8682-52d1979628fc",
      first_name: "Zola Nazer",
      soldAt: "04-Jan-2022",
    },
    {
      id: "8ab0d782-b025-4757-80ca-da4662a436fb",
      first_name: "Thor Butt Gow",
      soldAt: "23-Jan-2022",
    },
    {
      id: "4ccb4073-3d00-4d3b-a9fa-cb2a531cb1db",
      first_name: "Nonah Georgeau",
      soldAt: "28-Sep-2021",
    },
    {
      id: "d90e7883-dce9-4975-b806-d0c585202b86",
      first_name: "Mariele Gatecliffe",
      soldAt: "16-Jul-2021",
    },
  ]);

  return (
    <>
      <MenuLogged title="Dashboard" />
      <Content>
        <div className={styles.dashboardContainer}>
          <div className={styles.stickySearch}>
            <SearchInput />
            <Link href="/venta">
              <a href="">
                <Button>Nueva venta</Button>
              </a>
            </Link>
            <hr />
          </div>

          <div className={styles.sells}>
            {sells.map((sell) => (
              <article className={styles.sell} key={sell.id}>
                <p>{sell.id}</p>
                <time>{sell.soldAt}</time>
                <span>{sell.first_name}</span>
              </article>
            ))}
          </div>
        </div>
      </Content>
    </>
  );
}
