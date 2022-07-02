import React, { useEffect, useState, createContext } from "react";
import Content from "pages/structure/LayoutContent";
import App from "pages/app";
import scss from "./styles.module.scss";
import { getStatusSubscription } from "helpers/apis/subscription";
import PremiumMessage from "./PremiumMessage";
import CancelPremium from "./CancelPremium";
import NoPremiumMessage from "./NoPremiumMessage";
import LoadingStatus from "./LoadingStatus";

/**
 * @type {import("react-markdown/lib/ast-to-react").Context<{subscription:import("./types").StateSubscription}>}
 */
export const ContextSubscription = createContext();
const { Provider } = ContextSubscription;

export default function Subscription() {
  /**
   * State of the subscription
   * @type {[import("./types").StateSubscription,()=>void]}
   */
  const [subscription, setSubscription] = useState(undefined);

  useEffect(() => {
    (async function () {
      const apiSubscription = await getStatusSubscription();
      setSubscription(apiSubscription);
    })();
  }, []);

  return (
    <App>
      <Content>
        <Provider value={{ subscription }}>
          <div className={scss.subscription}>
            {subscription === undefined ? (
              <LoadingStatus />
            ) : (
              <div className={scss.subStatus}>
                {!subscription.isSubscribed ? (
                  <NoPremiumMessage />
                ) : (
                  <>
                    <PremiumMessage />
                    <CancelPremium />
                  </>
                )}
              </div>
            )}
          </div>
        </Provider>
      </Content>
    </App>
  );
}
