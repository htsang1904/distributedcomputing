"use strict";(self.webpackChunkapi=self.webpackChunkapi||[]).push([[3650],{17316:function(Q,B,t){t.r(B),t.d(B,{default:function(){return Ot}});var e=t(67294),v=t(16550),a=t(86896),C=t(64593),s=t(91134),T=t(185),F=t(88972),L=t(73727),A=t(80129),p=t(41580),I=t(75515),N=t(17034),ae=t(36989),G=t(92155),i=t(12028),O=t(49066),y=t(74571),g=t(11047),R=t(63237),H=t(70004),Y=t(78114),X=t(50738),se=t(29729),k=t(4585),We=t(33012),be=t(78971),Ke=t(11900),ze=t(92585),He=t(24652),$e=t(78521),Ve=t(27954),Qe=t(45697),h=t.n(Qe);const oe=({pagination:o})=>e.createElement(p.x,{paddingTop:6},e.createElement(g.k,{alignItems:"flex-end",justifyContent:"space-between"},e.createElement(s.v4,null),e.createElement(s.tU,{pagination:o})));oe.defaultProps={pagination:{pageCount:0,pageSize:10,total:0}},oe.propTypes={pagination:h().shape({page:h().number,pageCount:h().number,pageSize:h().number,total:h().number})};var x=t(49826),Ge=t(15537),$=t(29728),Ne=t(20022),Ye=t(2967);const Ee=({selected:o,onSuccess:r})=>{const{formatMessage:d}=(0,a.Z)(),[c,m]=(0,e.useState)(!1),{isLoading:f,remove:D}=(0,Ye.K)(),M=async()=>{await D(o),r()};return e.createElement(e.Fragment,null,e.createElement($.z,{variant:"danger-light",size:"S",startIcon:e.createElement(Ne.Z,null),onClick:()=>m(!0)},d({id:"global.delete",defaultMessage:"Delete"})),e.createElement(s.QH,{isConfirmButtonLoading:f,isOpen:c,onToggleDialog:()=>m(!1),onConfirm:M}))};Ee.propTypes={selected:h().arrayOf(x.pw,x.nx).isRequired,onSuccess:h().func.isRequired};var Je=t(32605),Xe=t(41054),ke=t(41609),we=t.n(ke),he=t(42866),pe=t(59946),qe=t(77197),_e=t(24969),et=t(11276),tt=t(19270),nt=t(36856),ye=t(88767),J=t(55994),u=t(57197);const at=()=>{const o=(0,s.lm)(),r=(0,ye.useQueryClient)(),d=(0,u.IF)("actions/bulk-move"),{post:c}=(0,s.kY)(),m=({destinationFolderId:M,filesAndFolders:E})=>{const S=E.reduce((P,l)=>{const{id:K,type:U}=l,V=U==="asset"?"fileIds":"folderIds";return P[V]||(P[V]=[]),P[V].push(K),P},{});return c(d,{...S,destinationFolderId:M})},f=(0,ye.useMutation)(m,{onSuccess(M){const{data:{data:E}}=M;E?.files?.length>0&&(r.refetchQueries([J.Z,"assets"],{active:!0}),r.refetchQueries([J.Z,"asset-count"],{active:!0})),r.refetchQueries([J.Z,"folders"],{active:!0}),o({type:"success",message:{id:(0,u.OB)("modal.move.success-label"),defaultMessage:"Elements have been moved successfully."}})}});return{...f,move:(M,E)=>f.mutateAsync({destinationFolderId:M,filesAndFolders:E})}};var st=t(66951),ot=t(20796);const le=({onClose:o,selected:r,currentFolder:d})=>{const{formatMessage:c}=(0,a.Z)(),{data:m,isLoading:f}=(0,ot.v)(),{move:D}=at();if(!m)return null;const M=async(P,{setErrors:l})=>{try{await D(P.destination.value,r),o()}catch(K){const V=(0,s.OT)(K).errors.reduce((q,W)=>(q[W.values?.path?.length||"destination"]=W.defaultMessage,q),{});we()(V)||l(V)}},E=()=>{o()};if(f)return e.createElement(he.P,{onClose:E,labelledBy:"title"},e.createElement(pe.f,null,e.createElement(g.k,{justifyContent:"center",paddingTop:4,paddingBottom:4},e.createElement(qe.a,null,c({id:(0,u.OB)("content.isLoading"),defaultMessage:"Content is loading."})))));const S={destination:{value:d?.id||"",label:d?.name||m[0].label}};return e.createElement(he.P,{onClose:E,labelledBy:"title"},e.createElement(Xe.J9,{validateOnChange:!1,onSubmit:M,initialValues:S},({values:P,errors:l,setFieldValue:K})=>e.createElement(s.l0,{noValidate:!0},e.createElement(_e.x,null,e.createElement(I.Z,{fontWeight:"bold",textColor:"neutral800",as:"h2",id:"title"},c({id:(0,u.OB)("modal.folder.move.title"),defaultMessage:"Move elements to"}))),e.createElement(pe.f,null,e.createElement(et.r,{gap:4},e.createElement(y.P,{xs:12,col:12},e.createElement(g.k,{direction:"column",alignItems:"stretch",gap:1},e.createElement(tt.Q,{htmlFor:"folder-destination"},c({id:(0,u.OB)("form.input.label.folder-location"),defaultMessage:"Location"})),e.createElement(st.Z,{options:m,onChange:U=>{K("destination",U)},defaultValue:P.destination,name:"destination",menuPortalTarget:document.querySelector("body"),inputId:"folder-destination",error:l?.destination,ariaErrorMessage:"destination-error"}),l.destination&&e.createElement(I.Z,{variant:"pi",as:"p",id:"folder-destination-error",textColor:"danger600"},l.destination))))),e.createElement(nt.m,{startActions:e.createElement($.z,{onClick:E,variant:"tertiary",name:"cancel"},c({id:"cancel",defaultMessage:"Cancel"})),endActions:e.createElement($.z,{type:"submit",loading:f},c({id:"modal.folder.move.submit",defaultMessage:"Move"}))}))))};le.defaultProps={currentFolder:void 0},le.propTypes={onClose:h().func.isRequired,currentFolder:x.nx,selected:h().arrayOf(x.nx,x.pw).isRequired};const re=({selected:o,onSuccess:r,currentFolder:d})=>{const{formatMessage:c}=(0,a.Z)(),[m,f]=(0,e.useState)(!1),D=()=>{f(!1),r()};return e.createElement(e.Fragment,null,e.createElement($.z,{variant:"secondary",size:"S",startIcon:e.createElement(Je.Z,null),onClick:()=>f(!0)},c({id:"global.move",defaultMessage:"Move"})),m&&e.createElement(le,{currentFolder:d,onClose:D,selected:o}))};re.defaultProps={currentFolder:void 0},re.propTypes={onSuccess:h().func.isRequired,currentFolder:x.nx,selected:h().arrayOf(x.pw,x.nx).isRequired};const ie=({selected:o,onSuccess:r,currentFolder:d})=>{const{formatMessage:c}=(0,a.Z)();return e.createElement(g.k,{gap:2,paddingBottom:5},e.createElement(I.Z,{variant:"epsilon",textColor:"neutral600"},c({id:(0,Ge.Z)("list.assets.selected"),defaultMessage:"{numberFolders, plural, one {1 folder} other {# folders}} - {numberAssets, plural, one {1 asset} other {# assets}} selected"},{numberFolders:o.filter(({type:m})=>m==="folder").length,numberAssets:o.filter(({type:m})=>m==="asset").length})),e.createElement(Ee,{selected:o,onSuccess:r}),e.createElement(re,{currentFolder:d,selected:o,onSuccess:r}))};ie.defaultProps={currentFolder:void 0},ie.propTypes={onSuccess:h().func.isRequired,currentFolder:x.nx,selected:h().arrayOf(x.pw,x.nx).isRequired};var lt=t(65169),de=t(96315),rt=t(70088);const it=({isFiltering:o,canCreate:r,canRead:d})=>o?{id:"list.assets-empty.title-withSearch",defaultMessage:"There are no elements with the applied filters"}:d?r?{id:"list.assets.empty-upload",defaultMessage:"Upload your first assets..."}:{id:"list.assets.empty",defaultMessage:"Media Library is empty"}:{id:"header.actions.no-permissions",defaultMessage:"No permissions to view"},xe=({canCreate:o,isFiltering:r,canRead:d,onActionClick:c})=>{const{formatMessage:m}=(0,a.Z)(),f=it({isFiltering:r,canCreate:o,canRead:d});return e.createElement(rt.i,{icon:d?null:lt.Z,action:o&&!r&&e.createElement($.z,{variant:"secondary",startIcon:e.createElement(de.Z,null),onClick:c},m({id:(0,u.OB)("header.actions.add-assets"),defaultMessage:"Add new assets"})),content:m({...f,id:(0,u.OB)(f.id)})})};xe.propTypes={canCreate:h().bool.isRequired,canRead:h().bool.isRequired,isFiltering:h().bool.isRequired,onActionClick:h().func.isRequired};var w=t(98101),dt=t(89597),ct=t(51386),ut=t(45219),Me=t(97581);const mt=()=>{const o=(0,e.useRef)(null),[r,d]=(0,e.useState)(!1),{formatMessage:c}=(0,a.Z)(),{trackUsage:m}=(0,s.rS)(),[{query:f},D]=(0,s.Kx)(),M=f?.filters?.$and||[],E=()=>d(l=>!l),S=l=>{D({filters:{$and:l},page:1})},P=l=>{m("didFilterMediaLibraryElements",{location:"content-manager",filter:Object.keys(l[l.length-1])[0]}),D({filters:{$and:l},page:1})};return e.createElement(e.Fragment,null,e.createElement($.z,{variant:"tertiary",ref:o,startIcon:e.createElement(dt.Z,null),onClick:E,size:"S"},c({id:"app.utils.filters",defaultMessage:"Filters"})),r&&e.createElement(ut.Z,{displayedFilters:Me.Z,filters:M,onSubmit:P,onToggle:E,source:o}),e.createElement(ct.Z,{appliedFilters:M,filtersSchema:Me.Z,onRemoveFilter:S}))};var gt=t(53979),ft=t(23620),vt=t(67109),Et=t(3543);const ce=({breadcrumbs:o,canCreate:r,folder:d,onToggleEditFolderDialog:c,onToggleUploadAssetDialog:m})=>{const{formatMessage:f}=(0,a.Z)(),{pathname:D}=(0,v.TH)(),[{query:M}]=(0,s.Kx)(),E={...M,folder:d?.parent?.id??void 0};return e.createElement(gt.T,{title:f({id:(0,u.OB)("plugin.name"),defaultMessage:"Media Library"}),subtitle:o&&d&&e.createElement(Et.O,{as:"nav",label:f({id:(0,u.OB)("header.breadcrumbs.nav.label"),defaultMessage:"Folders navigation"}),breadcrumbs:o,currentFolderId:d?.id}),navigationAction:d&&e.createElement(ft.r,{startIcon:e.createElement(vt.Z,null),to:`${D}?${(0,A.stringify)(E,{encode:!1})}`},f({id:(0,u.OB)("header.actions.folder-level-up"),defaultMessage:"Back"})),primaryAction:r&&e.createElement(g.k,{gap:2},e.createElement($.z,{startIcon:e.createElement(de.Z,null),variant:"secondary",onClick:c},f({id:(0,u.OB)("header.actions.add-folder"),defaultMessage:"Add new folder"})),e.createElement($.z,{startIcon:e.createElement(de.Z,null),onClick:m},f({id:(0,u.OB)("header.actions.add-assets"),defaultMessage:"Add new assets"})))})};ce.defaultProps={breadcrumbs:!1,folder:null},ce.propTypes={breadcrumbs:h().oneOfType([x.Fv,h().bool]),canCreate:h().bool.isRequired,folder:x.nx,onToggleEditFolderDialog:h().func.isRequired,onToggleUploadAssetDialog:h().func.isRequired};var ht=t(73817),pt=t(44466),yt=t(31817),xt=t(42047),Mt=t(16838);const Ct=(0,F.ZP)(p.x)`
  height: ${32/16}rem;
  display: flex;
  align-items: center;
`,Ce=(0,F.ZP)(I.Z)`
  max-width: 100%;
`,Ae=(0,F.ZP)(p.x)`
  svg {
    path {
      fill: ${({theme:o})=>o.colors.neutral500};
    }
  }
`,At=()=>{const{push:o}=(0,v.k6)(),{canRead:r,canCreate:d,canUpdate:c,canCopyLink:m,canDownload:f,isLoading:D}=(0,yt.y)(),M=(0,e.useRef)(),{formatMessage:E}=(0,a.Z)(),{pathname:S}=(0,v.TH)(),{trackUsage:P}=(0,s.rS)(),[{query:l},K]=(0,s.Kx)(),U=Boolean(l._q||l.filters),[V,q]=(0,s.Yw)(x.uf.view,x.Uk.GRID),W=V===x.Uk.GRID,{data:b,isLoading:Dt,errors:Rt}=(0,ht.L)({skipWhen:!r,query:l}),{data:Tt,isLoading:Pt,errors:Ft}=(0,pt.j)({enabled:r&&b?.pagination?.page===1&&!(0,u.rV)(l),query:l}),{data:ue,isLoading:Be,error:St}=(0,xt.W)(l?.folder,{enabled:r&&!!l?.folder});St?.response?.status===404&&o(S);const _=Tt?.map(n=>({...n,type:"folder",folderURL:(0,u.Km)(S,l,n.id),isSelectable:c}))??[],Z=_?.length||0,ee=b?.results?.map(n=>({...n,type:"asset",isSelectable:c}))||[],j=ee?.length??0,Zt=b?.pagination?.total,Le=Be||Pt||D||Dt,[jt,It]=(0,e.useState)(!1),[Ut,Oe]=(0,e.useState)(!1),[De,me]=(0,e.useState)(void 0),[ge,Re]=(0,e.useState)(void 0),[z,{selectOne:te,selectAll:Te}]=(0,s.Uq)(["type","id"],[]),Pe=z?.length>0&&z?.length!==j+Z,fe=()=>It(n=>!n),Fe=({created:n=!1}={})=>{n&&l?.page!=="1"&&K({...l,page:1}),Oe(ne=>!ne)},Se=(n,ne)=>{n.target.checked&&P("didSelectAllMediaLibraryElements"),Te(ne)},Ze=n=>{P("didSortMediaLibraryElements",{location:"upload",sort:n}),K({sort:n})},je=n=>{Re(n),Oe(!0)},Wt=n=>{Re(null),Fe(n),M.current&&M.current.focus()},Ie=n=>{n===j&&b.pagination.page===b.pagination.pageCount&&b.pagination.page>1&&K({...l,page:b.pagination.page-1})},bt=()=>{Te(),Ie(z.length)};return(0,s.go)(),e.createElement(N.A,null,e.createElement(T.o,{"aria-busy":Le},e.createElement(ce,{breadcrumbs:!Be&&(0,u.M4)(ue,{pathname:S,query:l}),canCreate:d,onToggleEditFolderDialog:Fe,onToggleUploadAssetDialog:fe,folder:ue}),e.createElement(ae.Z,{startActions:e.createElement(e.Fragment,null,c&&W&&(j>0||Z>0)&&e.createElement(Ct,{paddingLeft:2,paddingRight:2,background:"neutral0",hasRadius:!0,borderColor:"neutral200"},e.createElement(G.C,{"aria-label":E({id:(0,u.OB)("bulk.select.label"),defaultMessage:"Select all folders & assets"}),indeterminate:Pe,value:(j>0||Z>0)&&z.length===j+Z,onChange:n=>Se(n,[...ee,..._])})),r&&W&&e.createElement(Ve.Z,{onChangeSort:Ze}),r&&e.createElement(mt,null)),endActions:e.createElement(e.Fragment,null,e.createElement(s.jW,{permissions:Mt.Z.configureView},e.createElement(Ae,{paddingTop:1,paddingBottom:1},e.createElement(i.h,{forwardedAs:L.rU,to:{pathname:`${S}/configuration`,search:(0,A.stringify)(l,{encode:!1})},icon:e.createElement(Y.Z,null),label:E({id:"app.links.configure-view",defaultMessage:"Configure the view"})}))),e.createElement(Ae,{paddingTop:1,paddingBottom:1},e.createElement(i.h,{icon:W?e.createElement(X.Z,null):e.createElement(se.Z,null),label:E(W?{id:(0,u.OB)("view-switch.list"),defaultMessage:"List View"}:{id:(0,u.OB)("view-switch.grid"),defaultMessage:"Grid View"}),onClick:()=>q(W?x.Uk.LIST:x.Uk.GRID)})),e.createElement(s.m,{label:E({id:(0,u.OB)("search.label"),defaultMessage:"Search for an asset"}),trackedEvent:"didSearchMediaLibraryElements",trackedEventDetails:{location:"upload"}}))}),e.createElement(O.D,null,z.length>0&&e.createElement(ie,{currentFolder:ue,selected:z,onSuccess:bt}),Le&&e.createElement(s.dO,null),(Rt||Ft)&&e.createElement(s.Hn,null),Z===0&&j===0&&e.createElement(xe,{canCreate:d,canRead:r,isFiltering:U,onActionClick:fe}),r&&!W&&(j>0||Z>0)&&e.createElement($e.b,{assetCount:j,folderCount:Z,indeterminate:Pe,onChangeSort:Ze,onChangeFolder:n=>o((0,u.Km)(S,l,n)),onEditAsset:me,onEditFolder:je,onSelectOne:te,onSelectAll:Se,rows:[..._,...ee],selected:z,shouldDisableBulkSelect:!c,sortQuery:l?.sort??""}),r&&W&&e.createElement(e.Fragment,null,Z>0&&e.createElement(He.a,{title:(U&&j>0||!U)&&E({id:(0,u.OB)("list.folders.title"),defaultMessage:"Folders ({count})"},{count:Z})||""},_.map(n=>{const Kt=!!z.filter(({type:ve})=>ve==="folder").find(ve=>ve.id===n.id),Ue=(0,u.Km)(S,l,n?.id);return e.createElement(y.P,{col:3,key:`folder-${n.id}`},e.createElement(w.Ac,{ref:ge&&n.id===ge.id?M:void 0,ariaLabel:n.name,id:`folder-${n.id}`,to:Ue,startAction:te&&n.isSelectable?e.createElement(w.MM,{"data-testid":`folder-checkbox-${n.id}`,value:Kt,onChange:()=>te(n)}):null,cardActions:e.createElement(i.h,{icon:e.createElement(k.Z,null),"aria-label":E({id:(0,u.OB)("list.folder.edit"),defaultMessage:"Edit folder"}),onClick:()=>je(n)})},e.createElement(w.Bu,null,e.createElement(w.u6,{to:Ue},e.createElement(g.k,{as:"h2",direction:"column",alignItems:"start",maxWidth:"100%"},e.createElement(Ce,{fontWeight:"semiBold",ellipsis:!0},n.name,e.createElement(R.T,null,":")),e.createElement(Ce,{as:"span",textColor:"neutral600",variant:"pi",ellipsis:!0},E({id:(0,u.OB)("list.folder.subtitle"),defaultMessage:"{folderCount, plural, =0 {# folder} one {# folder} other {# folders}}, {filesCount, plural, =0 {# asset} one {# asset} other {# assets}}"},{folderCount:n.children.count,filesCount:n.files.count})))))))})),j>0&&Z>0&&e.createElement(p.x,{paddingTop:6,paddingBottom:4},e.createElement(H.i,null)),j>0&&e.createElement(ze.r,{assets:ee,onEditAsset:me,onSelectAsset:te,selectedAssets:z.filter(({type:n})=>n==="asset"),title:(!U||U&&Z>0)&&b?.pagination?.page===1&&E({id:(0,u.OB)("list.assets.title"),defaultMessage:"Assets ({count})"},{count:Zt})||""})),b?.pagination&&e.createElement(oe,{pagination:b.pagination}))),jt&&e.createElement(We.x,{onClose:fe,trackedLocation:"upload",folderId:l?.folder}),Ut&&e.createElement(be.f,{onClose:Wt,folder:ge,parentFolderId:l?.folder,location:"upload"}),De&&e.createElement(Ke.s,{onClose:n=>{n===null&&Ie(1),me(void 0)},asset:De,canUpdate:c,canCopyLink:m,canDownload:f,trackedLocation:"upload"}))};var Bt=t(60862);const Lt=(0,e.lazy)(()=>t.e(9514).then(t.bind(t,87532)));var Ot=()=>{const{config:{isLoading:o,isError:r,data:d}}=(0,Bt.Z)(),[{rawQuery:c},m]=(0,s.Kx)(),{formatMessage:f}=(0,a.Z)(),D=f({id:(0,u.OB)("plugin.name"),defaultMessage:"Media Library"});return(0,e.useEffect)(()=>{o||r||c||m({sort:d.sort,page:1,pageSize:d.pageSize})},[o,r,d,c,m]),(0,s.go)(),e.createElement(T.o,{"aria-busy":o},e.createElement(C.q,{title:D}),o&&e.createElement(s.dO,null),c?e.createElement(e.Suspense,{fallback:e.createElement(s.dO,null)},e.createElement(v.rs,null,e.createElement(v.AW,{exact:!0,path:`/plugins/${J.Z}`,component:At}),e.createElement(v.AW,{exact:!0,path:`/plugins/${J.Z}/configuration`,render:()=>e.createElement(Lt,{config:d})}))):null)}},36989:function(Q,B,t){t.d(B,{Z:function(){return A}});var e=t(85893),v=t(67294),a=t(45697),C=t(88972),s=t(11047),T=t(41580);const F=(0,C.ZP)(s.k)`
  & > * + * {
    margin-left: ${({theme:p})=>p.spaces[2]};
  }

  margin-left: ${({pullRight:p})=>p?"auto":void 0};
`,L=(0,C.ZP)(F)`
  flex-shrink: 0;
`,A=({startActions:p,endActions:I})=>p||I?(0,e.jsx)(T.x,{paddingLeft:10,paddingRight:10,children:(0,e.jsx)(T.x,{paddingBottom:4,children:(0,e.jsxs)(s.k,{justifyContent:"space-between",alignItems:"flex-start",children:[p&&(0,e.jsx)(F,{wrap:"wrap",children:p}),I&&(0,e.jsx)(L,{pullRight:!0,children:I})]})})}):null;A.defaultProps={endActions:void 0,startActions:void 0},A.propTypes={endActions:a.node,startActions:a.node}},49066:function(Q,B,t){t.d(B,{D:function(){return s}});var e=t(85893),v=t(67294),a=t(45697),C=t(41580);const s=({children:T})=>(0,e.jsx)(C.x,{paddingLeft:10,paddingRight:10,children:T});s.propTypes={children:a.node.isRequired}},53979:function(Q,B,t){t.d(B,{T:function(){return N}});var e=t(85893),v=t(67294),a=t(45697),C=t(88972);const s=i=>{const O=(0,v.useRef)(null),[y,g]=(0,v.useState)(!0),R=([H])=>{g(H.isIntersecting)};return(0,v.useEffect)(()=>{const H=O.current,Y=new IntersectionObserver(R,i);return H&&Y.observe(O.current),()=>{H&&Y.disconnect()}},[O,i]),[O,y]};var T=t(66300);const F=(i,O)=>{const y=(0,T.W)(O);(0,v.useLayoutEffect)(()=>{const g=new ResizeObserver(y);return Array.isArray(i)?i.forEach(R=>{R.current&&g.observe(R.current)}):i.current&&g.observe(i.current),()=>{g.disconnect()}},[i,y])};var L=t(41580),A=t(11047),p=t(75515);const I=()=>{const i=(0,v.useRef)(null),[O,y]=(0,v.useState)(null),[g,R]=s({root:null,rootMargin:"0px",threshold:0});return F(g,()=>{g.current&&y(g.current.getBoundingClientRect())}),(0,v.useEffect)(()=>{i.current&&y(i.current.getBoundingClientRect())},[i]),{containerRef:g,isVisible:R,baseHeaderLayoutRef:i,headerSize:O}},N=i=>{const{containerRef:O,isVisible:y,baseHeaderLayoutRef:g,headerSize:R}=I();return(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)("div",{style:{height:R?.height},ref:O,children:y&&(0,e.jsx)(G,{ref:g,...i})}),!y&&(0,e.jsx)(G,{...i,sticky:!0,width:R?.width})]})};N.displayName="HeaderLayout";const ae=(0,C.ZP)(L.x)`
  width: ${i=>i.width}px;
  z-index: ${({theme:i})=>i.zIndices[1]};
`,G=v.forwardRef(({navigationAction:i,primaryAction:O,secondaryAction:y,subtitle:g,title:R,sticky:H,width:Y,...X},se)=>{const k=typeof g=="string";return H?(0,e.jsx)(ae,{paddingLeft:6,paddingRight:6,paddingTop:3,paddingBottom:3,position:"fixed",top:0,right:0,background:"neutral0",shadow:"tableShadow",width:Y,"data-strapi-header-sticky":!0,children:(0,e.jsxs)(A.k,{justifyContent:"space-between",children:[(0,e.jsxs)(A.k,{children:[i&&(0,e.jsx)(L.x,{paddingRight:3,children:i}),(0,e.jsxs)(L.x,{children:[(0,e.jsx)(p.Z,{variant:"beta",as:"h1",...X,children:R}),k?(0,e.jsx)(p.Z,{variant:"pi",textColor:"neutral600",children:g}):g]}),y?(0,e.jsx)(L.x,{paddingLeft:4,children:y}):null]}),(0,e.jsx)(A.k,{children:O?(0,e.jsx)(L.x,{paddingLeft:2,children:O}):void 0})]})}):(0,e.jsxs)(L.x,{ref:se,paddingLeft:10,paddingRight:10,paddingBottom:8,paddingTop:i?6:8,background:"neutral100","data-strapi-header":!0,children:[i?(0,e.jsx)(L.x,{paddingBottom:2,children:i}):null,(0,e.jsxs)(A.k,{justifyContent:"space-between",children:[(0,e.jsxs)(A.k,{minWidth:0,children:[(0,e.jsx)(p.Z,{as:"h1",variant:"alpha",...X,children:R}),y?(0,e.jsx)(L.x,{paddingLeft:4,children:y}):null]}),O]}),k?(0,e.jsx)(p.Z,{variant:"epsilon",textColor:"neutral600",as:"p",children:g}):g]})});G.displayName="BaseHeaderLayout",G.defaultProps={navigationAction:void 0,primaryAction:void 0,secondaryAction:void 0,subtitle:void 0,sticky:!1,width:void 0},G.propTypes={navigationAction:a.node,primaryAction:a.node,secondaryAction:a.node,sticky:a.bool,subtitle:a.oneOfType([a.string,a.node]),title:a.string.isRequired,width:a.number},N.defaultProps={navigationAction:void 0,primaryAction:void 0,secondaryAction:void 0,subtitle:void 0},N.propTypes={navigationAction:a.node,primaryAction:a.node,secondaryAction:a.node,subtitle:a.oneOfType([a.string,a.node]),title:a.string.isRequired}},17034:function(Q,B,t){t.d(B,{A:function(){return L}});var e=t(85893),v=t(67294),a=t(45697),C=t(88972),s=t(41580);const T=(0,C.ZP)(s.x)`
  display: grid;
  grid-template-columns: ${({hasSideNav:A})=>A?"auto 1fr":"1fr"};
`,F=(0,C.ZP)(s.x)`
  overflow-x: hidden;
`,L=({sideNav:A,children:p})=>(0,e.jsxs)(T,{hasSideNav:!!A,children:[A,(0,e.jsx)(F,{paddingBottom:10,children:p})]});L.defaultProps={sideNav:void 0},L.propTypes={children:a.node.isRequired,sideNav:a.node}},185:function(Q,B,t){t.d(B,{o:function(){return s}});var e=t(85893),v=t(88972),a=t(41580);const C=(0,v.ZP)(a.x)`
  // To prevent global outline on focus visible to force an outline when Main is focused
  &:focus-visible {
    outline: none;
  }
`,s=({labelledBy:T="main-content-title",...F})=>(0,e.jsx)(C,{"aria-labelledby":T,as:"main",id:"main-content",tabIndex:-1,...F})},67109:function(Q,B,t){t.d(B,{Z:function(){return a}});var e=t(85893);const v=C=>(0,e.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"1rem",height:"1rem",fill:"none",viewBox:"0 0 24 24",...C,children:(0,e.jsx)("path",{fill:"#212134",d:"M24 13.3a.2.2 0 0 1-.2.2H5.74l8.239 8.239a.2.2 0 0 1 0 .282L12.14 23.86a.2.2 0 0 1-.282 0L.14 12.14a.2.2 0 0 1 0-.282L11.86.14a.2.2 0 0 1 .282 0L13.98 1.98a.2.2 0 0 1 0 .282L5.74 10.5H23.8c.11 0 .2.09.2.2v2.6Z"})}),a=v},78114:function(Q,B,t){t.d(B,{Z:function(){return a}});var e=t(85893);const v=C=>(0,e.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"1rem",height:"1rem",fill:"none",viewBox:"0 0 24 24",...C,children:(0,e.jsx)("path",{fill:"#212134",fillRule:"evenodd",d:"M2.68 9.192c-.6.276-2.114 1.18-2.306 1.303a.792.792 0 0 0-.374.68v1.65a.797.797 0 0 0 .384.687c.254.16 1.73 1.042 2.306 1.303l.744 1.8c-.24.634-.67 2.333-.72 2.554a.797.797 0 0 0 .216.744l1.167 1.166a.801.801 0 0 0 .744.216l.03-.008c.36-.092 1.946-.498 2.523-.712l1.8.744c.276.6 1.181 2.115 1.304 2.307a.805.805 0 0 0 .679.374h1.649a.797.797 0 0 0 .686-.384c.16-.254 1.042-1.73 1.303-2.306l1.8-.744c.634.24 2.333.67 2.554.72a.797.797 0 0 0 .744-.216l1.166-1.167a.803.803 0 0 0 .216-.744l-.008-.03c-.092-.36-.498-1.946-.712-2.523l.744-1.8c.6-.276 2.115-1.181 2.307-1.304a.804.804 0 0 0 .374-.679v-1.649a.796.796 0 0 0-.382-.679c-.254-.16-1.73-1.041-2.306-1.303l-.744-1.8c.24-.634.67-2.333.72-2.554a.796.796 0 0 0-.216-.744l-1.166-1.173a.802.802 0 0 0-.744-.216l-.03.008c-.361.092-1.947.498-2.524.712l-1.8-.744c-.276-.6-1.18-2.115-1.303-2.307a.803.803 0 0 0-.68-.374h-1.65a.797.797 0 0 0-.68.382c-.16.254-1.041 1.73-1.303 2.306l-1.8.744c-.634-.24-2.333-.67-2.554-.72a.797.797 0 0 0-.744.216L2.921 4.094a.802.802 0 0 0-.216.744l.008.03c.092.361.498 1.947.712 2.524l-.744 1.8ZM12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z",clipRule:"evenodd"})}),a=v}}]);